import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Board, Task } from './board.model';
import firebase from "firebase/compat/app";
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private _boardsCollection: AngularFirestoreCollection<Board>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this._boardsCollection = this.db.collection("boards");
  }

  async createBoard(data: Board) {
    const user = await this.afAuth.currentUser;
    if (user) {
      return this._boardsCollection.add({
        ...data,
        userUID: user.uid,
      })
    } else {
      console.error("User not logged in!");
      return;
    }
  }

  deleteBoard(boardID: string) {
    return this._boardsCollection.doc(boardID).delete();
  }

  updateTasks(boardID: string, tasks: Task[]) {
    return this._boardsCollection.doc(boardID).update({ tasks })
  }

  removeTask(boardID: string, task: Task) {
    return this._boardsCollection.doc(boardID).ref.update({
      tasks: firebase.firestore.FieldValue.arrayRemove(task)
    });
  }

  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          const boardsQuery = this._boardsCollection.ref.where("userUID", "==", user.uid).orderBy("priority");
          return boardsQuery.get();
        }
        return [];
      })
    )
  }

  async sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const currentBoardsFromStorage = boards.map((board) => this._boardsCollection.doc(board.id));
    currentBoardsFromStorage.forEach((board, idx) => batch.update(board.ref, { priority: idx}));

    try {
      await batch.commit();
    } catch(err) {
      console.error("Batch failed. At least one write failed.", err);
    }
  }
}
