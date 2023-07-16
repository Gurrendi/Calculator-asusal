	var input ="";
	var hasresult =false;
function subtract() {
   		input = $("#display");
		if (input.val().substring(".")) {
			hasDecimal = false;
			input.val(input.val().substring(0, input.val().length - 1));
		}
	}
function calculate(){
		let input = $('#display').val();
		// evaluate the input string using the built-in `eval()` function
		let result = eval(input);
		// check if the result is finite
		if (isFinite(result)) {
		  // round the result to 2 decimal places
		  result = Math.round(result * 100) / 100;
		  // update the input box with the result
		  $('#display').val(result);
		} else {
		  // display an error message in the input box
		  $('#display').val('Error');
		}
	}
function clearScreen(){
		 $("#display").val("");
	}
   
$(document).ready(function() {
	let operatorRegex = /[+\-*/]/g;
	var isOpen = false; // flag to track whether the parentheses are open or closed
	//Prevent multiple input of operator on keyboard
	$("#display").on("keydown", function(event) {
  		var operatorKeys = ["+", "-", "*", "/", "%"]; // array of operator keys
		// check if the pressed key is an operator
		if (operatorKeys.indexOf(event.key) !== -1) {
			// check if the input already contains an operator
			if (this.value.match(/[+\-*/%]/)) {
			event.preventDefault(); // prevent the operator from being added
			}
		}
	});
	
	//Display Value from input
    $('#1,#2,#3,#4,#5,#6,#7,#8,#9,#0').on('click',function(){
		input=$('#display').val();
		let value = $(this).val();
    	$('#display').val(input + value);
	});
	//Prevent multiple input of operator
	$('#add,#subt,#multi,#divv,#doto,#lbra,#rbra').on('click',function(){
		let input = $('#display').val();
		let value = $(this).val();
		let lastChar = input.slice(-1); 

		if ($(this).attr('id') === 'doto') {  // check if the clicked button is the decimal point button
			if (!isNaN(lastChar) || lastChar === ')') {
			let decimalIndex = input.lastIndexOf('.');// check if the input string already contains a decimal point
			if (decimalIndex === -1 || decimalIndex < input.lastIndexOf(operatorRegex)) {
				$('#display').val(input + value);
			}
			}
		} else {
			if (!isNaN(lastChar) || lastChar === ')' || lastChar === '.') {
			$('#display').val(input + value);
			} else if (value === '(') {
			$('#display').val(input + value);
			} else if (value === ')') {
			// Ensure that the opening and closing parentheses are balanced
			let numOpenParens = input.split('(').length - 1;
			let numCloseParens = input.split(')').length - 1;
			if (numOpenParens > numCloseParens && !isNaN(lastChar)) {
				$('#display').val(input + value);
				}
			} else if (operatorRegex.test(value)) {
			// Ensure that the last character is a number or a closing parenthesis
			if (!isNaN(lastChar) || lastChar === ')') {
				$('#display').val(input + value);
				}
			}
	}
	});

	$('#parentheses-btn').click(function() {
		var text = $('#display').val();
		if (isOpen) {
		  $('#display').val(text + ')'); // insert the closing parenthesis
		  isOpen = false;
		} else {
		  $('#display').val(text + '('); // insert the opening parenthesis
		  isOpen = true;
		}
	});
	$('#plus-minus-btn').click(function() {
		var textarea = $('#display')[0]; // get the DOM element for the text area
		var start = textarea.selectionStart; // get the start cursor position
		var end = textarea.selectionEnd; // get the end cursor position
		var text = textarea.value; // get the current value of the text area
		var newText = ''; // initialize the new text string
		
		if (start === end) { // if no text is selected, toggle the sign of the first number
		  var i = start;
		  while (i > 0 && /\d|\./.test(text.charAt(i - 1))) { // find the beginning of the number
			i--;
		  }
		  if (i === start && text.charAt(i) === '-') { // if the cursor is already on a negative sign, remove it
			newText = text.substring(0, i) + text.substring(i + 1);
		  } else if (i < start || text.charAt(i) !== '-') { // if the cursor is not on a negative sign, add one
			newText = text.substring(0, i) + '-' + text.substring(i);
		  } else { // otherwise, do nothing
			newText = text;
		  }
		  start = i; // update the cursor position to the beginning of the number
		  end = start;
		} else { // if text is selected, toggle the sign of all selected numbers
		  var selectedText = text.substring(start, end);
		  if (/^-?\d+(\.\d+)?$/.test(selectedText)) { // check if the selected text is a number
			if (selectedText.charAt(0) === '-') { // if the selected text is negative, make it positive
			  newText = text.substring(0, start) + selectedText.substring(1) + text.substring(end);
			  end = start + selectedText.length - 1; // update the cursor position to the end of the selected text
			} else { // if the selected text is positive, make it negative
			  newText = text.substring(0, start) + '-' + selectedText + text.substring(end);
			}
		  } else { // if the selected text is not a number, do nothing
			newText = text;
		  }
		}

		textarea.value = newText; // set the new value of the text area
		textarea.setSelectionRange(start, end); // set the new cursor position
	  });
	

	// add event listener for keydown event on document
	$(document).on('keydown', function(event) {
	let key = event.key;  // get the key that was pressed
	// map the key presses to the corresponding button clicks
	switch (key) {
		case '0':
		$('#0').click();
		break;
		case '1':
		$('#1').click();
		break;
		case '2':
		$('#2').click();
		break;
		case '3':
		$('#3').click();
		break;
		case '4':
		$('#4').click();
		break;
		case '5':
		$('#5').click();
		break;
		case '6':
		$('#6').click();
		break;
		case '7':
		$('#7').click();
		break;
		case '8':
		$('#8').click();
		break;
		case '9':
		$('#9').click();
		break;
		case '+':
		$('#add').click();
		break;
		case '-':
		$('#subt').click();
		break;
		case '*':
		$('#multi').click();
		break;
		case '/':
		$('#divv').click();
		break;
		case '.':
		$('#doto').click();
		break;
		case '(':
		$('#parentheses-btn').click();
		break;
		case ')':
		$('#parentheses-btn').click();
		break;
		case 'Enter':
			calculate();
		break;
		case 'Backspace':
			subtract()
		break;
		case 'Escape':
			clearScreen();
		break;  
		default:
		break;
	}
	});


	});