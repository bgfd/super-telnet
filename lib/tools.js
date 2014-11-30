function echo(string) {
	console.log('Debug: '+string);
}

function debug(string) {
	if(SPDEBUG) echo(string);
}

module.exports.echo = echo;
module.exports.debug = debug;