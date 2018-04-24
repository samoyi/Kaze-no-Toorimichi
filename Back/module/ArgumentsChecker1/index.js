'use strict';

function ArgumentsChecker(oCustomTypes={})
{
	// Get type string of checked with lower case
	this.getTypeWithLowerCase = (checked)=>{
		return Object.prototype.toString.call(checked).slice(8, -1)
																.toLowerCase();
	}

	// Complex custom types.
	this.customTypes = oCustomTypes;
}


ArgumentsChecker.prototype = {
	constructor: ArgumentsChecker,

	// Get arguments object or rest parameters
	get(args){
		if(!args[Symbol.iterator]){
			args = [args];
		}
		this.args = [...args];
		return this;
	},


	// Check arguments amount
	amount(nExpected){
		let nArgumentsLength = this.args.length;
		if(nArgumentsLength < nExpected){
			throw new TypeError('ArgumentsChecker: Expects at least ' + nExpected + ' arguments, ' + nArgumentsLength + ' given.');
		}
		return this;
	},


	// Check arguments type
	types(aExpected){
		aExpected.forEach((type, index)=>{
			if(type === null){
				return;
			}

			if(typeof type !== 'string'){
				throw new TypeError('Argument of ArgumentsChecker.types() '
									+ 'must be a type string or null');
			}
			type = type.trim();
			let sGivenType =  this.getTypeWithLowerCase(this.args[index]),
				sExpectedType = '';

			if(this.customTypes.hasOwnProperty(type)){
				// Use call method here, because:
				// if a custom type method is a nested type checker, and if it
				// is anarrow function, `this` keyword in the function will be
				// bind to ArgumentsChecker instance.
				if( !this.customTypes[type].call(this, this.args[index]) ){
					throw new TypeError('ArgumentsChecker: argument '
					 			+ (index+1) + ' expects ' + type + '.');
				}
			}
			else if(type){
				type = type.trim().toLowerCase();

				// Number type does not include NaN
				if(Number.isNaN(this.args[index]) && type==='number'){
					throw new TypeError('ArgumentsChecker: argument '
					 			+ (index+1) + ' expects number, NaN given.');
				}

				if(type !== sGivenType){
					if(type==='object'){
						sExpectedType = 'plain object';
					}
					else{
						sExpectedType = type;
					}
					if(sGivenType==='object'){sGivenType='plain object'};

					throw new TypeError('ArgumentsChecker: argument '
					 			+ (index+1) + ' expects ' + type + ', '
								+ sGivenType + ' given.');
				}
			}
		});
		return this;
	},
}

module.exports = ArgumentsChecker;
