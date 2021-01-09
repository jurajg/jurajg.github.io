
// inspiration:
// https://www.thingiverse.com/thing:1880517/comments


/**
 * Round half up ('round half towards positive infinity')
 * Uses exponential notation to avoid floating-point issues.
 * Negative numbers round differently than positive numbers.
 source: https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
 */
function round(num, decimalPlaces = 0) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}

// layer = ring layer of filament inside spool, the layer closest to spool cylinder has smallest radius
// the outermost layer has largest radius
function layerRadius(index, minDiameter, filamentWidth)
{
    return (minDiameter+filamentWidth*(index+1))/2
}

// returns layer length [mm]
function layerLength(index, minDiameter, filamentWidth, layerRowCount)
{
    return 2*Math.PI*layerRadius(index, minDiameter, filamentWidth)*layerRowCount
}

function calculate()
{

var filamentWidth = parseFloat(document.getElementById('filamentWidth').value)
var filamentDensity = parseFloat(document.getElementById('filamentDensity').value)

var spoolWidth = parseFloat(document.getElementById('spoolWidth').value)
var minDiameter = parseFloat(document.getElementById('minDiameter').value)
var outerDiameterFilament = parseFloat(document.getElementById('filamentDiameter').value)
var correctionConstant = parseFloat(document.getElementById('correctionConstant').value)

console.log(filamentWidth);
console.log(filamentDensity);
console.log(spoolWidth);
console.log(minDiameter);
console.log(outerDiameterFilament);
console.log(correctionConstant);

filamentDensity = filamentDensity * 1000000 // [g/m^3]
stringSurface = Math.PI*Math.pow( ((filamentWidth/2)/1000), 2 ) // [m^2]
//spool_filament_volume = spool_filament_weight / density // [m^3]
//spool_filament_length = spool_filament_volume / stringSurface
//print(f"spool_filament_length : {spool_filament_length} [m]")

layersWidth=(outerDiameterFilament-minDiameter)/2
console.log('layersWidth/filamentWidth='+layersWidth/filamentWidth)
layerCount=Math.round(layersWidth/filamentWidth)
console.log('layerCount :'+layerCount)
layerRowCount = Math.round(spoolWidth / filamentWidth)
console.log('layer row count :'+layerRowCount)

lenSum = 0
for(i=0;i<layerCount;i++)
{
    ll = layerLength(i, minDiameter, filamentWidth, layerRowCount)
    lenSum += ll
    console.log('layer index: '+i+' length '+ll+' mm')
}
filamentLength = correctionConstant * lenSum / 1000 // [m]
filamentLength = round(filamentLength, 2)

filamentWeight = filamentDensity * filamentLength * stringSurface
filamentWeight = round(filamentWeight, 2)

// output values to form
var remainingLengthInput = document.getElementById('remainingLength')
var remainingWeightInput = document.getElementById('remainingWeight')
remainingLengthInput.value = filamentLength
remainingWeightInput.value = filamentWeight

}
