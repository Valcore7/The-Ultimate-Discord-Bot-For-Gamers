const { readdirSync } = require("fs");
const { resolve } = require("path");
const ascii = require("ascii-table");
let table = new ascii("Events").setHeading("Event", "Load status");

module.exports = client => {
	const dirs = readdirSync(resolve(`${__dirname}/../events`));
	for (const dir of dirs) {
		const files = readdirSync(resolve(`${__dirname}/../events/${dir}`)).filter(f =>
			f.endsWith(".js")
		);
		for (const file of files) {
			const event = require(resolve(`${__dirname}/../events/${dir}/${file}`));
			const name = event.name ? event.name : file.split(".")[0];
			if (event.run) {
				table.addRow(name, "✅");
				client[event.once ? "once" : "on"](name, event.run.bind(null, client));
			} else {
				table.addRow(name, "❌");
			}
		}
	}
	console.log(table.toString());
};
