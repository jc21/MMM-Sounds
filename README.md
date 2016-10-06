# MMM-Sounds

This a module for the [MagicMirror](https://magicmirror.builders/).
It can play WAV sounds through your Pi when triggered by other modules.

**This can only play WAV files.**

Although this has been developed for the Raspbian operating system, any system that uses `alsa` would likely work too.


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
			startupSound:   'wobble.wav',
			quietTimeStart: '23:00',      // 11pm
			quietTimeEnd:   '07:00'       // 7am
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
			<td><code>quietTimeStart</code></td>
			<td>The 24 hour and minute start of Quiet time<br>
				<br><b>Possible values:</b> <code>string</code>
				<br><b>Default value:</b> <code>null</code>
			</td>
		</tr>
		<tr>
			<td><code>quietTimeEnd</code></td>
			<td>The  24 hour and minute end of Quiet time<br>
				<br><b>Possible values:</b> <code>string</code>
				<br><b>Default value:</b> <code>null</code>
			</td>
		</tr>
		<tr>
			<td><code>debug</code></td>
			<td>Enable to display more debug messages in console<br>
				<br><b>Possible values:</b> <code>bool</code>
				<br><b>Default value:</b> <code>false</code>
			</td>
		</tr>
	</tbody>
</table>


## Quiet Times

This module supports *not* playing sounds during a quiet time, if BOTH the `quietTimeStart` and `quietTimeEnd` config
options are specified.

The values for these times are HH:mm and must be in 24 hour format. Examples:

- `00:30` - 12:30am
- `06:30` - 6:30am
- `14:11` - 2:11pm
- `23:30` - 11:30pm


## Telling the module to play sounds from another module

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
