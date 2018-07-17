let state = {
  key: 'szBpztTSNpAoa8s7S'
};

const themes = {
  'good': {
		images: {
			headerURL: 'good.png'
		},
    colors: {
      accentcolor: '#00e400',
      textcolor: '#111',
    }
  },
  'moderate': {
		images: {
			headerURL: 'moderate.png'
		},
    colors: {
      accentcolor: '#ffff00',
      textcolor: '#111',
    }
  },
  'sensitive': {
		images: {
			headerURL: 'sensitive.png'
		},
    colors: {
      accentcolor: '#ff7e00',
      textcolor: '#111',
    }
  },
  'unhealthy': {
		images: {
			headerURL: 'unhealthy.png'
		},
    colors: {
      accentcolor: '#ff0000',
      textcolor: '#111',
    }
  },
  'veryunhealthy': {
		images: {
			headerURL: 'veryunhealthy.png'
		},
    colors: {
      accentcolor: '#8f3f97',
      textcolor: '#111',
    }
  },
  'hazardous': {
		images: {
			headerURL: 'hazardous.png'
		},
    colors: {
      accentcolor: '#7e0023',
      textcolor: '#fff',
    }
  }
};

(async function() {
  getAQI(async function(aqi) {
    let name = await getAQILevelName(aqi);
    setTheme(name);
  });
})();

async function getAQILevelName(aqi) {
  let name = '';
  if (aqi < 51)
  	name = 'good';
  else if (aqi < 101)
    name = 'moderate';
  else if (aqi < 151)
    name = 'sensitive';
  else if (aqi < 201)
    name = 'unhealthy';
  else if (aqi < 251)
    name = 'veryunhealthy';
  else
    name = 'hazardous';
  return name;
}

async function getAQI(cb) {
  navigator.geolocation.getCurrentPosition(async function(position) {
    let getURL = 'http://api.airvisual.com/v2/nearest_city'
      + '?key=' + state.key
      + '&lat=' + position.coords.latitude
      + '&lon=' + position.coords.longitude;
    let resp = await fetch(getURL);
    let json = await resp.json();
    let aqi = json.data.current.pollution.aqius;
    cb(aqi);
  });
}

var currentTheme = '';

function setTheme(theme) {
  if (currentTheme === theme) {
    // No point in changing the theme if it has already been set.
    return;
  }
  currentTheme = theme;
  browser.theme.update(themes[theme]);
}
