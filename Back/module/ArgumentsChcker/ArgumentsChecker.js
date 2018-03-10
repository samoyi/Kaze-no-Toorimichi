'use strict';

function ArgumentsChecker(oCustomTypes={})
{
	// Get type string of checked with lower case
	this.getTypeWithLowerCase = (checked)=>{
		return Object.prototype.toString.call(checked).slice(8, -1)
																.toLowerCase();
	}

	// Throw Error
	if(Error.captureStackTrace){
		let oForStack = {};
		this.throwErr = (sErr, fnCaller)=>{
			Error.captureStackTrace(oForStack, fnCaller);
			throw new TypeError(sErr, '\n', oForStack.stack);
		}
	}
	else{
		this.throwErr = (sErr)=>{
			throw new TypeError(sErr);
		}
	}

	// Complex custom types.
	this.customTypes = oCustomTypes;
}


ArgumentsChecker.prototype = {
	// Get arguments object or rest parameters
	get(args){
		this.args = [...args];
		return this;
	},


	// Check arguments amount
	amount(nExpected){
		let nArgumentsLength = this.args.length;
		if(nArgumentsLength < nExpected){
			this.throwErr('ArgumentsChecker: Expects at least ' + nExpected + ' arguments, ' + nArgumentsLength + ' given.', ArgumentsChecker.prototype.amount);
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
				if( !this.customTypes[type](this.args[index]) ){
					this.throwErr('ArgumentsChecker: argument ' + (index+1)
								+ ' expects ' + type + '.'
								, ArgumentsChecker.prototype.types);
				}
			}
			else if(type){
				type = type.trim().toLowerCase();

				// Number type does not include NaN
				if(Number.isNaN(this.args[index]) && type==='number'){
					this.throwErr('ArgumentsChecker: argument ' + (index+1)
								+ ' expects number, NaN given.'
								, ArgumentsChecker.prototype.types);
				}

				if(type !== sGivenType){
					if(type==='object'){
						sExpectedType = 'plain object';
					}
					else{
						sExpectedType = type;
					}
					if(sGivenType==='object'){sGivenType='plain object'};

					this.throwErr('ArgumentsChecker: argument ' + (index+1)
								+ ' expects ' + type + ', '
								+ sGivenType + ' given.'
								, ArgumentsChecker.prototype.types);
				}
			}
		});
		return this;
	},
}

module.exports = ArgumentsChecker;
