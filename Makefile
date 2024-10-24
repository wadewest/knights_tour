
default: test

run:
	deno run --allow-read main.ts

test:
	deno test tests/

