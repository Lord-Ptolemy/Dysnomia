exports.command = function(prefix, message, options){

	options.sensitive = false;
	options.allowMention = true;

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
	
	
	
}