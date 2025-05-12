import {UserRepository} from "../../domain/repositories/UserRepository";
import {User} from "../../domain/entities/User";
import {injectable} from "tsyringe";
import {db} from "./firebase";

@injectable()
export class UserRepositoryFirestore implements UserRepository {
  private collection = db.collection("users");

  async getByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection.where("email", "==", email).limit(1).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return new User(doc.id, doc.get("email"));
  }

  async create(email: string): Promise<User> {
    const docRef = await this.collection.add({email});
    return new User(docRef.id, email);
  }
}
