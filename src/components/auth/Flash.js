class Flash {


  _messages = null;
  //_temp or private variable

  static setMessage(type, message) {
    this._messages = this.messages || {};
    this._messages[type] = message;
  }

  static getMessages() {
    return this._messages;
  }
  static clearMessages(){
    this._messages = null;
  }
}

export default Flash;
