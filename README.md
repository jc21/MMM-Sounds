# MMM-Sounds

This a module for the [MagicMirror](https://magicmirror.builders/).
It can play MP3 sounds through your device when triggered by other modules.

*This can only play WAV files.*


## Prerequisites
1. [Read this to configure sound output for your Raspberry Pi](https://www.raspberrypi.org/documentation/configuration/audio-config.md)
2. Make sure `alsa` is installed on your Pi: `sudo apt-get install alsa-base alsa-utils`
3. Adjust your volume output, try 100% first with: `alsamixer`
4. Optional, test your speaker output: `speaker-test -t sine -f 440 -c 2 -s 1`

## Module Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/jc21/MMM-Sounds.git`
2. Execute `cd MMM-Sounds && npm install` to install the node dependencies.
3. Optional, test the alsa player with a wav file: `aplay sounds/woop-woop.wav`
4. Add config to your magic mirror config file


## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

````javascript
modules: [
	{
		module: 'MMM-Sounds',
		config: {
			startupSound: 'wobble.wav'
		}
	}
]
````


## Configuration options

The following properties can be configured:

<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>startupSound</code></td>
			<td>The sound to play after module startup<br>
				<br><b>Possible values:</b> <code>string</code>
				<br><b>Default value:</b> <code>null</code>
			</td>
		</tr>
		<tr>
			<td><code>defaultDelay</code></td>
			<td>The default delay before playing the file in milliseconds<br>
				<br><b>Possible values:</b> <code>integer</code>
				<br><b>Default value:</b> <code>10</code>
			</td>
		</tr>
		<tr>
			<td><code>debug</code></td>
			<td>Enable to display more PIR debug messages in console<br>
				<br><b>Possible values:</b> <code>bool</code>
				<br><b>Default value:</b> <code>false</code>
			</td>
		</tr>
	</tbody>
</table>

## Telling the module to play sounds

From another module you can tell this module to play a sound in 2 ways:

In your module:

```javascript
this.sendNotification('PLAY_SOUND', 'wobble.wav');
```

or also specifying a delay:

```javascript
this.sendNotification('PLAY_SOUND', {sound: 'wobble.wav', delay: 1000}); // 1 second delay
```


## Included sounds

- `buzz.wav`
- `sonar.wav`
- `ta-ting.wav`
- `twip.wav`
- `wobble.wav`
- `woop-woop.wav`


## Adding sounds

Just put your WAV files in `modules/MMM-Sounds/sounds/` and reference those files in your other modules.


## Known modules that play sounds

- [MMM-IFTTT](https://github.com/jc21/MMM-IFTTT)
