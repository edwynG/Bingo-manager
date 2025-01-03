import {
  Carton,
  Game,
  LastGame,
  Matrix,
  Round,
  Statistics,
} from "../types/game";
import IndexedDBManager from "./indexedDBManager";
const databaseName: string = import.meta.env.VITE_DATABASE;
const storeName: string = import.meta.env.VITE_STORE_NAME;

class StateGame {
  private state: Game = null as any;
  private dbManager: IndexedDBManager;

  constructor() {
    this.reset();
    this.dbManager = new IndexedDBManager(databaseName, storeName);
  }
  public reset(): void {
    this.state = {
      id: 0,
      numberOfGames: 0,
      rounds: [],
      cartons: [],
      statistics: {
        wins: 0,
        losses: 0,
        cartonsWon: [],
        cartonsLost: [],
        lastGame: {
          round: {
            number: 0,
            pattern: [],
          },
          resultCartons: [],
        },
      },
      finish: false,
    };
  }

  public setState(state: Game): void {
    this.state = state;
  }
  private async saveState(): Promise<void> {
    try {
      await this.dbManager.updateGame(this.state);
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  }

  public async restoreGame(): Promise<Game | undefined> {
    try {
      const game = await this.dbManager.getGame(this.state.id);
      this.state = game ? game : this.state;
      return game;
    } catch (error) {
      console.error("Failed to get game:", error);
      return undefined;
    }
  }

  public getNumberOfGames(): number {
    return this.state.numberOfGames;
  }

  public async setNumberOfGames(numberOfGames: number): Promise<void> {
    this.state.numberOfGames = numberOfGames;
    await this.saveState();
  }

  public async addRound(round: Round): Promise<void> {
    this.state.rounds.push(round);
    await this.saveState();
  }
  public getRounds(): Round[] {
    return this.state.rounds;
  }

  public async setRoundPatternMatrix(
    roundNumber: number,
    pattern: Matrix<boolean>
  ) {
    this.state.rounds[roundNumber].pattern = pattern;
    await this.saveState();
  }

  public async addCarton(carton: Carton): Promise<void> {
    this.state.cartons.push(carton);
    await this.saveState();
  }

  public async setCartons(cartons: Carton[]): Promise<void> {
    this.state.cartons = cartons;
    await this.saveState();
  }

  public getCartons(): Carton[] {
    return this.state.cartons;
  }

  public async setStatistics(statistics: Statistics): Promise<void> {
    this.state.statistics = statistics;
    await this.saveState();
  }

  public async setLastGame(lastGame: LastGame): Promise<void> {
    this.state.statistics.lastGame = lastGame;
    await this.saveState();
  }
  public getLastGame(): LastGame {
    return this.state.statistics.lastGame;
  }
  public async incrementWins(): Promise<void> {
    this.state.statistics.wins += 1;
    await this.saveState();
  }

  public async incrementLosses(): Promise<void> {
    this.state.statistics.losses += 1;
    await this.saveState();
  }

  public isFinish(): boolean {
    return this.state.finish;
  }
  public async Finish(): Promise<void> {
    this.state.finish = true;
    await this.saveState();
  }

  public async notFinish(): Promise<void> {
    this.state.finish = false;
    await this.saveState();
  }

  public async addCartonWon(carton: Carton): Promise<void> {
    this.state.statistics.cartonsWon.push(carton);
    await this.saveState();
  }

  public async addCartonLost(carton: Carton): Promise<void> {
    this.state.statistics.cartonsLost.push(carton);
    await this.saveState();
  }
}

export default StateGame;
