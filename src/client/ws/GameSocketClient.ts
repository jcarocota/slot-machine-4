import {gameConfig} from "../config/GameConfig.ts";
export class GameSocketClient extends WebSocket {
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
      console.log("Message from server:", event.data);
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

  balance = () => {
    const idRequest = new Date().getTime();
    const query = {
      idRequest: idRequest,
      action: "balance",
      user: "guest",
      stake: 1,
    };
    this.sendMessage(JSON.stringify(query));
    return idRequest;
  };
}
