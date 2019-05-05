
//-----------conversion types

var length = {

  //conversion table
  units: ["foot", "mile", "inch", "yard"], //column
  foot: [1,0.0001893,12,0.3333],
  mile: [5280,1,63360,1760],
  inch: [0.08333,0.000015782,1,0.02777],
  yard: [3,0.0005681,36,1]


}

var speed = {

  //conversion table
  units: ["mph", "kph"], //column
  mph: [1,1.6093],
  kph: [0.6214,1]


}

var mass = {

  //conversion table
  units: ["pound", "kilogram", "ounce", "ton"], //column
  pound: [1,0.453,16,0.0005],
  kiloGram: [2.205,1,35.274,0.00110231],
  ounce: [0.0625,0.0283495,1,0.00003125],
  ton: [2000,907.185,32000,1]

}

//--------





//listener for the selection of conversion type to create (from & to) unit option list
document.getElementById('conversion_type_selection').addEventListener("change", function() {


//gets the conversion type user picked
var conversion_type = document.getElementById('conversion_type_selection').value;

//gets the current list of options for to/from unit selection
var current_input_unit_options = document.getElementById('input_unit').childNodes;
var current_output_unit_options = document.getElementById('output_unit').childNodes;



//removes the current list of options for to/from unit selection
for (var i = current_input_unit_options.length; i >= 0; i--) {

  if (current_input_unit_options[i] != null  && current_output_unit_options[i] != null) {

      current_input_unit_options[i].remove();
      current_output_unit_options[i].remove();
  }

}

createUnitSelection (conversion_type);
var inputBox = document.getElementById('user_input');
inputBox.value = "";
var resultBox = document.getElementById('result');
resultBox.innerHTML = ""






});


//event listner for the change of the "to" unit selection
document.getElementById('output_unit').addEventListener("change", function(){


//get conversion type, value to convert , unit to convert from , & unit to convert to
var conversion_type = document.getElementById('conversion_type_selection').value;
var userInput = document.getElementById("user_input").value;
var inputUnit = document.getElementById("input_unit").value;
var outputUnit = document.getElementById("output_unit").value;


//call the coverter function
converter(userInput, conversion_type, inputUnit, outputUnit);


});


function createUnitSelection (conversionType) {

  //get the conversion type object (length, speed, mass)
  var type = window[conversionType];


  //get the from/to select elements (will be used to add opitions depending on the conversion type)
  var input_units = document.getElementById("input_unit");
  var output_units = document.getElementById("output_unit");

  //loops throught the # of units there is for a type and adds it as an option child node to the select parent element
  for (var i = 0;i < type.units.length; i++) {


    var unit = document.createElement("option");
    unit.className = "unit_option";
    unit.value = type.units[i];
    unit.innerHTML = type.units[i];
    input_units.appendChild(unit);
    output_units.appendChild(unit.cloneNode(true));  //need to clone child element or it'll be taken from other parent element


  }

}


function converter (value,conversionType,convertFrom,convertTo) {


  var type = window[conversionType];
  console.log(type);
  var convertToIndex = type.units.indexOf(convertTo); //column #
  console.log(convertToIndex);
  var convertFromList = type[convertFrom];
  console.log(convertFromList);
  var convertedValue = value * convertFromList[convertToIndex];
  console.log(convertedValue);


  //for debug/testing
  console.log("-----testing----");
  console.log("conversion type: " + conversionType);
  console.log("input value: " + value);
  console.log("convert from: " + convertFrom);
  console.log("convert to: " + convertTo);
  console.log("output value :" + convertedValue);
  console.log(type.units);
  console.log("1 " + convertFrom + " = " + convertFromList);
  console.log();
  //console.log(converter(weightValue, inputWeightUnit, outputWeightUnit));


  //display result on page
  var resultDisplay= document.getElementById("result");
  resultDisplay.innerHTML = convertedValue + " " + convertTo;


}


//add event listner for input inbox and if anything thats not a number is inserted show error to user
