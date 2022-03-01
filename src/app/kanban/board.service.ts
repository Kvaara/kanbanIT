import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Board, Task } from './board.model';
import firebase from "firebase/compat/app";
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private _boardsCollection: AngularFirestoreCollection<Board>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
  ) {
    this._boardsCollection = this.db.collection("boards");
  }

  async createBoard(data: Board) {
    try {
      const user = await this.afAuth.currentUser;
      const docRef = await this._boardsCollection.ref.add({
        ...data,
        userUID: user!.uid,
      })
      this.snackBar.open("New board created.", "OK", {
        duration: 5000,
      });
      return docRef.id;
    } catch (err) {
      this.snackBar.open("New board couldn't be created. Please try again...", "OK", {
        duration: 10000,
      });
      throw new Error("New board couldn't be created. Check your internet connection: " + err);
    }
  }

  async deleteBoard(boardID: string) {
    try {
      await this._boardsCollection.doc(boardID).delete();
      this.snackBar.open("Board deleted.", "OK", {
        duration: 5000,
      });
    } catch (err) {
      this.snackBar.open("Board couldn't be deleted. Please try again...", "OK", {
        duration: 10000,
      });
      throw new Error("Board couldn't be deleted. Check your internet connection: " + err);
    }
  }

  async updateTasks(boardID: string, tasks: Task[], isCreateAction: boolean) {
    try {
      await this._boardsCollection.doc(boardID).update({ tasks });
      if (isCreateAction) {
        this.snackBar.open("New task created.", "OK", {
          duration: 5000,
        });
      }
    } catch (err) {
      if (isCreateAction) {
        this.snackBar.open("Task couldn't be created. Please try again...", "OK", {
          duration: 10000,
        });
      } else {
        this.snackBar.open("Task order couldn't be updated/saved. Check your internet connection...", "OK", {
          duration: 10000,
        });
      }
      throw new Error("Task couldn't be created/updated. Check your internet connection: " + err);
    }
  }

  async updateBoard(boardID: string, board: Board) {
    try {
      await this._boardsCollection.doc(boardID).update({title: board.title});
      this.snackBar.open("Kanban title updated.", "OK", {
        duration: 5000,
      });
    } catch (err) {
      this.snackBar.open("Kanban title couldn't be updated. Please try again...", "OK", {
        duration: 10000,
      });
      throw new Error("Board's title couldn't be updated. Check your internet connection: " + err);
    }
  } 

  async removeTask(boardID: string, task: Task) {
    try {
      await this._boardsCollection.doc(boardID).ref.update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
      this.snackBar.open("Task deleted.", "OK", {
        duration: 5000,
      });
    } catch (err) {
      this.snackBar.open("Task couldn't be deleted. Please try again...", "OK", {
        duration: 10000,
      });
      throw new Error("Task couldn't be deleted. Check your internet connection: " + err);
    }
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
