function DefaultOptions(defaults, options) {
	
	if(!options){
		options = {};
	}
	
	for (var key in defaults) {
		if (!options.hasOwnProperty(key)){
			options[key] = defaults[key];
		}
	}
	
	return options;
}

var defaults = {
	sensitive : false,
	allowMention : false
}

exports.command = function (prefix, message, options) {

	options = DefaultOptions(defaults, options);

	/*
		>>help command subcommand arg1=bop arg2="bop bop" -fl --verbose
		
		should ideally output:
		{
			command : "help",
			arguments : ["command", "subcommand"],
			options : {
				arg1 : "bop",
				arg2 : "bop bop"
				verbose : true
			},
			flags : ["f", "l"]
		}	
	*/
	
	function isValidCommandType(){
		if(options.sensitive){
			// don't trim, keep case sensitivity
			if(message.content.indexOf(prefix) === 0){
				message.content = message.content.substr(prefix.length);
				return true;
			}
		}else if(options.allowMention){
			// see if the user is mentioned
			if(message.isMentioned(options.allowMention)){
				message.content = message.content.replace(options.allowMention.mention(), "");
				return true;
			}
				
		}else{
			// trim, don't care about case
			var insen = message.content.trim().toUpperCase();
			if(insen.indexOf(prefix.toUpperCase()) === 0){
				message.content = message.content.substr(prefix.length);
				return true;
			}
		}
		return false;
	}
	
	if( !isValidCommandType() ){
		return false;
	}
	
	var command = message.content.split(" ")[0];
	var args = [], onEscape=false, buffer="", inQuotes=false;
	
	for(var char of message.content.replace(command, "")){
		if(char === " " && !inQuotes){
			args.push(buffer);
			buffer = "";
			continue;
		}
		if(char === "\""){
			if(inQuotes){
				if(!onEscape){
					//the end of that quote
					args.push(buffer);
					inQuotes = false;
					buffer = "";
					continue;
				}else{
					//continue adding
					buffer += char;
					continue;
				}
			}else{
				if(!onEscape)
					inQuotes=true;
				continue;
			}
		}
		if(char === "\\"){
			if(!onEscape){
				onEscape = true;
				continue;
			}else{
				onEscape = false;
				buffer += char;
				continue;
			}
		}
		if(onEscape){
			onEscape=false;
		}
		buffer += char;
	}
	
	if(buffer.length > 0){
		args.push(buffer);
		buffer = "";
	}
	
	for(var i in args){
		if(args[i].length === 0){
			args.splice(i, 1);
		}
	}
	
	console.log("hi:",args)
	
	return args;
}