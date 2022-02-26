import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Board, Task } from './board.model';
import firebase from "firebase/compat/app";
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  async createBoard(data: Board) {
    // const user = await this.afAuth.currentUser;
    return this.db.collection("boards").add({
      ...data
    })
  }

  deleteBoard(boardID: string) {
    return this.db.collection("boards").doc(boardID).delete();
  }

  updateTasks(boardID: string, tasks: Task[]) {
    return this.db.collection("boards").doc(boardID).update({ tasks })
  }

  removeTask(boardID: string, task: Task) {
    return this.db.collection("boards").doc(boardID).update({
      tasks:  firebase.firestore.FieldValue.arrayRemove(task)
    });
  }

  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.collection("boards", ref => ref.where("uid", "==", user.uid).orderBy("priority"))
          .valueChanges({ idField: "id" });
        }
        return [];
      })
    )
  }

  async sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((board) => db.collection("boards").doc(board.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx}));

    try {
      await batch.commit();
    } catch(err) {
      console.error("Batch failed. At least one write failed.", err);
    }
  }
}
