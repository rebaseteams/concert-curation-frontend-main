/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionsInterface } from '../../model/interfaces/actions';

export default class Actions implements ActionsInterface {
    private actionsRepo: ActionsInterface;

    constructor(actionsRepo: ActionsInterface) {
      this.actionsRepo = actionsRepo;
    }

  createActions = async () => this.actionsRepo.createActions();

  getActions = async () => this.actionsRepo.getActions()
}
