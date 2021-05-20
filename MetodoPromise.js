function $Promise(executor){
  
 if( typeof executor !== "function") { throw new TypeError ("Executor debe ser una function")};  
this._stado ="pending";
this._value = undefined;
this.functiongroups = [];
this._callhandler();
executor(this._internalResolve.bind(this), this._internalReject.bind(this));

}
$Promise.prototype._internalResolve = function(data){
    if(this._stado === "pending"){
        this._stado= "fulfilled";
         this._value=data;
    }

}
$Promise.prototype._internalReject = function(reason){
    if(this._stado === "pending"){
        this._stado="rejected";
        this._value=reason;
    }

}
$Promise.prototype.then = function(succescb, errcb){
if(succescb !== "function")succescb= false;
if(errcb !== "function")errcb=false;
this.functiongroups.push ({
    succescb,
    errcb
})
if(this._stado ==="pending") this._callhandler();
}

$Promise.prototype._callhandler = function (){
while (this.functiongroups.length){
    var actualhandler = this.functiongroups.shift();
    if(this._stado ==="fulfilled"){
      if(actualhandler.succescb)  actualhandler.succescb(this._value);
    }else{
      if(actualhandler.errcb)  actualhandler.errcb(this._value);
    }
}

}
$Promise.prototype.catch = function(errcb){
this.then(null, errcb);
}
module.exports($Promise);