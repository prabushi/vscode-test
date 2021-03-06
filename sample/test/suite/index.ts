import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(testsRoot: string, cb: (error: any, failures?: number) => void): void {
	console.log("#8 run suite1");
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd'
	});

	glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
		if (err) {
			return cb(err);
		}

		// Add files to the test suite
		files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

		try {
			// Run the mocha test
			mocha.run(failures => {
				cb(null, failures);
			});
		} catch (err) {
			console.error(err);
			cb(err);
		}
	});
}
