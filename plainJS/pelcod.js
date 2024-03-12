var a = 1
var SYNC = 0xFF

function PelcoD(options) {
    var defaultOptions = {
        addrs: [],
        defaultAddr: 0x01
    }
	
    this.options ={...defaultOptions}

    var bts = [
        SYNC                        // sync
        , this.options.defaultAddr  // address
        , 0x00                        // command 1
        , 0x00                        // command 2
        , 0x00                        // data 1
        , 0x00                        // data 2
        , 0x00                        // checksum
    ]

    var extended_bts = [
        SYNC                        // sync
        , this.options.defaultAddr  // address
        , 0x00                        // command 1
        , 0x00                        // command 2
        , 0x00                        // data 1
        , 0x00                        // data 2
        , 0x00                        // checksum
    ]
    
    this.bytes = new Bytes(bts)
    this.extended_bytes = new Bytes(extended_bts)
}


/**** CONFIG COMMANDS ****/

PelcoD.prototype.setAddress = function(value) {
    this.bytes.setAddress(value)
    this.extended_bytes.setAddress(value)
}

PelcoD.prototype.setAddrDefault = function(value) {
    this.options.defaultAddr = this.options.addrs[value]
}

/**** STANDARD COMMAND SET ****/

PelcoD.prototype.setPanSpeed = function(speed) {
    if(speed < 0x00 || speed > 0xFF)
        speed = 0x00
    this.bytes.getData1().set(speed)
    return this
}

PelcoD.prototype.setTiltSpeed = function(speed) {
    if(speed < 0x00 || speed > 0x3F)
        speed = 0x00
    this.bytes.getData2().set(speed)
    return this
}

PelcoD.prototype.up = function(status) {
    if(status === true) {
        this.bytes.getCom2().on(0x03)
        this.bytes.getCom2().off(0x04)
    } else {
        this.bytes.getCom2().off(0x03)
    }
    return this
}

PelcoD.prototype.down = function(status) {
    if(status === true) {
        this.bytes.getCom2().on(0x04)
        this.bytes.getCom2().off(0x03)
    } else {
        this.bytes.getCom2().off(0x04)
    }
    return this
}

PelcoD.prototype.left = function(status) {
    if(status === true) {
        this.bytes.getCom2().on(0x02)
        this.bytes.getCom2().off(0x01)
    } else {
        this.bytes.getCom2().off(0x02)
    }
    return this
}

PelcoD.prototype.right = function(status) {
    if(status === true) {
        this.bytes.getCom2().on(0x01)
        this.bytes.getCom2().off(0x02)
    } else {
        this.bytes.getCom2().off(0x01)
    }
    return this
}

PelcoD.prototype.focusNear = function(status) {
    if(status === true) {
        this.bytes.getCom1().on(0x00)
        this.bytes.getCom2().off(0x07)
    } else {
        this.bytes.getCom1().off(0x00)
    }
    return this
}

PelcoD.prototype.focusFar = function(status) {
    if(status === true) {
        this.bytes.getCom2().on(0x07)
        this.bytes.getCom1().off(0x00)
    } else {
        this.bytes.getCom2().off(0x07)
    }
    return this
}

PelcoD.prototype.irisOpen = function(status) {
    if(status === true) {
        this.bytes.getCom1().on(0x01)
        this.bytes.getCom1().off(0x02)
    } else {
        this.bytes.getCom1().off(0x01)
    }
    return this
}

PelcoD.prototype.irisClose = function(status) {
    if(status === true) {
        this.bytes.getCom1().on(0x02)
        this.bytes.getCom1().off(0x01)
    } else {
        this.bytes.getCom1().off(0x02)
    }
    return this
}

PelcoD.prototype.zoomIn = function(status) {
    if(status === true) {
        this.bytes.getCom2().on(0x05)
        this.bytes.getCom2().off(0x06)
    } else {
        this.bytes.getCom2().off(0x05)
    }
    return this
}

PelcoD.prototype.zoomOut = function(status) {
    if(status === true) {
        this.bytes.getCom2().on(0x06)
        this.bytes.getCom2().off(0x05)
    } else {
        this.bytes.getCom2().off(0x06)
    }
    return this
}



PelcoD.prototype.sendSetPreset = function(position, callback) {
    this.extended_bytes.clearAll(false)
        .setCom2(0x03)
        .setData2(position)
       
    this.send_extended(callback)

    return this
}

PelcoD.prototype.sendClearPreset = function(position, callback) {
    this.extended_bytes.clearAll(false)
        .setCom2(0x05)
        .setData2(position)

    this.send_extended(callback)

    return this
}

PelcoD.prototype.sendGotoPreset = function(position, callback) {
    this.extended_bytes.clearAll(false)
        .setCom2(0x07)
        .setData2(position)

    this.send_extended(callback)

    return this
}

PelcoD.prototype.sendSetAux = function(aux, callback) {
    this.extended_bytes.clearAll(false)
        .setCom2(0x09)
        .setData2(aux)

    this.send_extended(callback)

    return this
}

PelcoD.prototype.sendClearAux = function(aux, callback) {
    this.extended_bytes.clearAll(false)
        .setCom2(0x0B)
        .setData2(aux)

    this.send_extended(callback)

    return this
}

PelcoD.prototype.sendSetZoomSpeed = function(speed, callback) {
    this.extended_bytes.clearAll(false)
        .setCom2(0x25)
        .setData2(speed)

    this.send_extended(callback)

    return this
}

/**** OTHER COMMANDS ****/

PelcoD.prototype.setCamera = function(status) {
    if(status === true) {
        this.bytes.getCom1().on(0x07)
        this.bytes.getCom1().on(0x03)
    } else {
        this.bytes.getCom1().off(0x03)
        this.bytes.getCom1().off(0x07)
    }
    return this
}

PelcoD.prototype.setCameraAuto = function(status) {
    if(status === true) 
        this.bytes.getCom1().on(0x04)
    else
        this.bytes.getCom1().off(0x04)
    return this
}


/**** HELPFUL COMMANDS ****/

/**
 * Stop moving
 */
PelcoD.prototype.stop = function() {
    this.setTiltSpeed(0)
        .setPanSpeed(0)
        .left(0)
        .right(0)
        .up(0)
        .down(0)
        .zoomIn(0)
        .zoomOut(0)
        .focusNear(0)
        .focusFar(0)
        .irisOpen(0)
        .irisClose(0)

    return this
}

/**
 * Build the byte and send it to stream
 */
PelcoD.prototype.send = function(callback) {
    var buffer = this.bytes.getBuffer()
    if(typeof(this.stream) === 'undefined' || typeof(this.stream.write) === 'undefined')
        console.warn('Stream pipe not found')
    else
        this.stream.write(buffer, callback)
    return this
}

PelcoD.prototype.send_extended = function(callback) {
    var buffer = this.extended_bytes.getBuffer()
    if(typeof(this.stream) === 'undefined' || typeof(this.stream.write) === 'undefined')
        console.warn('Stream pipe not found')
    else
        this.stream.write(buffer, callback)
    return this
}

