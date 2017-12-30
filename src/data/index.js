export const trainLines = [
  {
    name: 'red',
    textcolor: 'white',
    stops: [
      {
        name: 'Howard',
        staId: 40900,
        stpId: {
          N: 30173,
          S: 30174,  
        } 
      },
      {
        name: 'Jarvis',
        staId: 41190,
        stpId: {
          N: 30227,
          S: 30228,  
        } 
      },
      {
        name: 'Morse',
        staId: 40100,
        stpId: {
          N: 30020,
          S: 30021,  
        } 
      },
      {
        name: 'Loyola',
        staId: 41300,
        stpId: {
          N: 30251,
          S: 30252,  
        } 
      },
      {
        name: 'Granville',
        staId: 40760,
        stpId: {
          N: 30147,
          S: 30148,  
        } 
      },
      {
        name: 'Thorndale',
        staId: 40880,
        stpId: {
          N: 30169,
          S: 30170,  
        } 
      },
      // 'Bryn Mawr',
      // 'Berwyn',
      // 'Argyle',
      // 'Lawrence',
      // 'Wilson',
      // 'Sheridan',
      // 'Addison',
      // 'Belmont',
      // 'Fullerton',
      // 'North/Clybourn',
      // 'Clark/Division',
      // 'Chicago',
      // 'Grand',
      // 'Lake',
      // 'Monroe',
      // 'Jackson',
      // 'Harrison',
      // 'Roosevelt',
      // 'Cermak-Chinatwon',
      // 'Sox-35th',
      // '47th',
      // 'Garfield',
      // '63rd',
      // '69th',
      // '79th',
      // '87th',
      // '95th/Dan Ryan'
    ],
    destination: {
      1: {
        name: 'Howard',
        direction: 'N'
      },
      5: {
        name: '95th/Dan Ryan',
        direction: 'S'
      }
    }
  },
  {
    name: 'blue',
    textcolor: 'white',
    stops: [
      'O\'Hare',
      'Rosemont',
      'Cumberland',
      'Harlem',
      'Jefferson Park',
      'Montrose',
      'Irving Park',
      'Addison',
      'Belmont',
      'Logan Square',
      'California',
      'Western',
      'Damen',
      'Division',
      'Chicago',
      'Grand',
      'Clark/Lake',
      'Washington',
      'Monroe',
      'Jackson',
      'LaSalle',
      'Clinton',
      'UIC-Halsted',
      'Racine',
      'Illinois Medical District',
      'Western',
      'Kedzie-Homan',
      'Pulaski',
      'Cicero',
      'Austin',
      'Oak Park',
      'Harlem',
      'Forest Park'
    ],
    destination: {
      1: {
        name: 'O\'Hare',
        direction: 'NW'
      },
      5: {
        name: 'Forest Park',
        direction: 'W'
      }
    }
  },
  {
    name: 'green',
    textcolor: 'white'
  },
  {
    name: 'orange',
    textcolor: 'black',
    stops: [
      {
        name: 'Roosevelt',
        staId: 41400,
        stpId: {
          N: 30080,
          S: 30081,  
        } 
      },
      {
        name: 'H.W. Library',
        staId: 40850,
        stpId: {
          L: 30166,
        } 
      },
      {
        name: 'LaSalle/Van Buren',
        staId: 40160,
        stpId: {
          L: 30031,
        } 
      },
      {
        name: 'Quincy/Wells',
        staId: 40040,
        stpId: {
          L: 30007,
        } 
      },
      {
        name: 'Washington/Wells',
        staId: 40730,
        stpId: {
          L: 30141,
        } 
      },
      {
        name: 'Clark/Lake',
        staId: 40380,
        stpId: {
          L: 30074,
        } 
      },
      {
        name: 'State/Lake',
        staId: 40260,
        stpId: {
          L: 30050,
        } 
      },
      {
        name: 'Washington/Wabash',
        staId: 41700,
        stpId: {
          L: 30384,
        } 
      },
      {
        name: 'Adams/Wabash',
        staId: 40680,
        stpId: {
          L: 30132,
        } 
      },

    ],
    destination: {
      1: {
        name: 'Loop',
        direction: 'N'
      },
      5: {
        name: 'Midway',
        direction: 'S'
      },
      oppositeToL: {
        name: 'Midway'
      }
    }
  },
  {
    name: 'brown',
    textcolor: 'white'
  },
  {
    name: 'purple',
    textcolor: 'white'
  },
  {
    name: 'yellow',
    textcolor: 'black'
  },
  {
    name: 'pink',
    textcolor: 'black'
  }
]
