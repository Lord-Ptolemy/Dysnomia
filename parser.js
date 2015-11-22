function DefaultOptions(defaults, options) {
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
			return message.content.indexOf(prefix) === 0;
		}else if(options.allowMention){
			// see if the user is mentioned
			if(message.isMentioned(options.allowMention)){
				message.content = message.content.replace(options.allowMention.mention(), "");
				return true;
			}else{
				return false;
			}
				
		}else{
			// trim, don't care about case
			var insen = message.content.trim().toUpperCase();
			return message.content.indexOf(prefix.toUpperCase()) === 0;
		}
	}

}