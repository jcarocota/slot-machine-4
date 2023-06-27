import { gameConfig } from "../config/GameConfig.ts";
import {
  RequestInfo,
  RequestStatus,
  RequestType,
  RequestValues,
} from "./RequestInfo.ts";

export class GameSocketClient extends WebSocket {
  private static _instance: GameSocketClient;

  private readonly pendingRequests = new Map<number, RequestInfo>();
  constructor() {
    const url = `ws://${gameConfig.wsUrl}:${gameConfig.wsPort}/`;

    super(url);
    this.loadListeners();
  }

  private loadListeners = () => {
    // Connection opened
    super.addEventListener("open", (event) => {
      console.log("WebSocket connection established.", event);

      // Sending data to the server
      //socket.send('Hello Server!');
    });

    // Listen for messages from the server
    super.addEventListener("message", (event) => {
      //console.log("Message from server:", event.data);

      try {
        const jsonData = JSON.parse(event.data);

        const request = this.pendingRequests.get(Number(jsonData["idRequest"]));

        if (request) {
          request.requestStatus = RequestStatus.resolved;
          request.data = jsonData;
        }
      } catch (e) {
        console.log("Unable to convert to JSON. Data received:", event.data);
        //console.error(e);
      }
    });

    // Handle errors
    super.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    // Connection closed
    super.addEventListener("close", (event) => {
      console.log("WebSocket connection closed.", event);
    });
  };

  private waitForOpenConnection = () => {
    return new Promise((resolve, reject) => {
      const maxNumberOfAttempts = 10;
      const intervalTime = 200; //ms

      let currentAttempt = 0;
      const interval = setInterval(() => {
        if (currentAttempt > maxNumberOfAttempts - 1) {
          clearInterval(interval);
          reject(new Error("Maximum number of attempts exceeded"));
        } else if (this.readyState === this.OPEN) {
          clearInterval(interval);
          resolve("Connection Opened");
        }
        currentAttempt++;
      }, intervalTime);
    });
  };

  private sendMessage = async (data: string) => {
    if (this.readyState !== this.OPEN) {
      try {
        await this.waitForOpenConnection();
        this.send(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      this.send(data);
    }
  };

  private addRequestToTrackingMap = (
    idRequest: number,
    requestType: RequestType
  ) => {
    const request: RequestInfo = {
      idRequest: idRequest,
      requestType: requestType,
      requestStatus: RequestStatus.pending,
      data: undefined,
    };

    this.pendingRequests.set(idRequest, request);
  };

  private removeRequestToTrackingMap = (idRequest: number) => {
    this.pendingRequests.delete(idRequest);
  };

  getRequestData = (idRequest: number) => {
    const request = this.pendingRequests.get(idRequest);

    let data;

    if (request && request.requestStatus == RequestStatus.resolved) {
      data = request.data;
      this.removeRequestToTrackingMap(idRequest);
    }

    return data;
  };

  balance = () => {
    const idRequest = new Date().getTime();
    const query: RequestValues = {
      idRequest: idRequest,
      action: "balance",
      user: "guest",
      stake: 1,
    };
    this.sendMessage(JSON.stringify(query));

    this.addRequestToTrackingMap(idRequest, RequestType.balance);

    return idRequest;
  };

  spin = (stake: number) => {
    const idRequest = new Date().getTime();
    const query: RequestValues = {
      idRequest: idRequest,
      action: "spin",
      user: "guest",
      stake: stake,
    };
    this.sendMessage(JSON.stringify(query));

    this.addRequestToTrackingMap(idRequest, RequestType.balance);

    return idRequest;
  };

  static get instance(): GameSocketClient {
    if (!this._instance) {
      this._instance = new GameSocketClient();
    }

    return this._instance;
  }
}
