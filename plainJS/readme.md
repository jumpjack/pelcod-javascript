Files converted into plain javascript for further use.

Just import the script into your HTML file, then use:

pelcod = new PelcoD();

to create your pelco-d object.

## Pelco-D commands supported by this library

### Static
- focusNear
- focusFar
- stop

### With parameters
- left
- right
- up
- down
- zoomIn
- zoomOut
  
- irisOpen
- irisClose
- setAddress
- setAddrDefault
- setPanSpeed
- setTiltSpeed
- sendSetPreset
- sendClearPreset
- sendGotoPreset
- sendSetAux
- sendClearAux
- sendSetZoomSpeed
- setCamera
- setCameraAuto


## Pelco-D command structure:

1) 0xff: constant
2) 0x01: address (constant)
3) 0x00: **command 1**
4) 0xXX: **command 2**
5) 0xYY: **parameter 1**
6) 0xZZ: **parameter 2**
7) Checksum

## Pelco-D commands table

![list](https://github.com/jumpjack/pelcod-javascript/blob/master/plainJS/Pelco-D-CommandList.jpg)



