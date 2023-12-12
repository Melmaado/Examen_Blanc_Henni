import Model from './Model.js';

export default class Task extends Model {

  static table = "schema.tache";
  static primary = ["tache_id"];
}
