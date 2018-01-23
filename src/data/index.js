export const trainLines = [
  {
    name: 'red',
    textcolor: 'white',
    rt: 'Red', //rt is to specify route name when fetching arrival data, see TrainAction.js creator
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
      {
        name: 'Bryn Mawr',
        staId: 41380,
        stpId: {
          N: 30267,
          S: 30268,  
        } 
      },
      {
        name: 'Berwyn',
        staId: 40340,
        stpId: {
          N: 30066,
          S: 30067,  
        } 
      },
      {
        name: 'Argyle',
        staId: 41200,
        stpId: {
          N: 30229,
          S: 30230,  
        } 
      },
      {
        name: 'Lawrence',
        staId: 40770,
        stpId: {
          N: 30149,
          S: 30150,  
        } 
      },
      {
        name: 'Wilson',
        staId: 40540,
        stpId: {
          N: 30105,
          S: 30106,  
        } 
      },
      {
        name: 'Sheridan',
        staId: 40080,
        stpId: {
          N: 30016,
          S: 30017,  
        } 
      },
      {
        name: 'Addison',
        staId: 41420,
        stpId: {
          N: 30273,
          S: 30274,  
        } 
      },
      {
        name: 'Belmont',
        staId: 41320,
        stpId: {
          N: 30255,
          S: 30256,  
        } 
      },
      {
        name: 'Fullerton',
        staId: 41220,
        stpId: {
          N: 30233,
          S: 30234,  
        } 
      },
      {
        name: 'North/Clybourn',
        staId: 40650,
        stpId: {
          N: 30125,
          S: 30126,  
        } 
      },
      {
        name: 'Clark/Division',
        staId: 40630,
        stpId: {
          N: 30121,
          S: 30122,  
        } 
      },
      {
        name: 'Chicago',
        staId: 41450,
        stpId: {
          N: 30279,
          S: 30280,  
        } 
      },
      {
        name: 'Grand',
        staId: 40330,
        stpId: {
          N: 30064,
          S: 30065,  
        } 
      },
      {
        name: 'Lake',
        staId: 41660,
        stpId: {
          N: 30289,
          S: 30290,  
        } 
      },
      {
        name: 'Monroe',
        staId: 41090,
        stpId: {
          N: 30211,
          S: 30212,  
        } 
      },
      {
        name: 'Jackson',
        staId: 40560,
        stpId: {
          N: 30109,
          S: 30110,  
        } 
      },
      {
        name: 'Harrison',
        staId: 41490,
        stpId: {
          N: 30285,
          S: 30286,  
        } 
      },
      {
        name: 'Roosevelt',
        staId: 41400,
        stpId: {
          N: 30269,
          S: 30270,  
        } 
      },
      {
        name: 'Cermak-Chinatown',
        staId: 41000,
        stpId: {
          N: 30193,
          S: 30194,  
        } 
      },
      {
        name: 'Sox-35th',
        staId: 40190,
        stpId: {
          N: 30036,
          S: 30037,  
        } 
      },
      {
        name: '47th',
        staId: 41230,
        stpId: {
          N: 30237,
          S: 30238,  
        } 
      },
      {
        name: 'Garfield',
        staId: 41170,
        stpId: {
          N: 30223,
          S: 30224,  
        } 
      },
      {
        name: '63rd',
        staId: 40910,
        stpId: {
          N: 30177,
          S: 30178,  
        } 
      },
      {
        name: '69th',
        staId: 40990,
        stpId: {
          N: 30191,
          S: 30192,  
        } 
      },
      {
        name: '79th',
        staId: 40240,
        stpId: {
          N: 30046,
          S: 30047,  
        } 
      },
      {
        name: '87th',
        staId: 41430,
        stpId: {
          N: 30275,
          S: 30276,  
        } 
      },
      {
        name: '95th/Dan Ryan',
        staId: 40450,
        stpId: {
          N: 30088,
          S: 30089,  
        } 
      },
    ],
    boundFor: {
      1: {
        name: 'Howard',
        direction: 'N',
        key: 1
      },
      5: {
        name: '95th/Dan Ryan',
        direction: 'S',
        key: 5
      }
    }
  },
  {
    name: 'blue',
    rt: 'Blue',
    textcolor: 'white',
    stops: [
      {
        name: 'O\'Hare',
        staId: 40890,
        stpId: {
          N: 30171,
          S: 30172,  
        } 
      },
      {
        name: 'Rosemont',
        staId: 40820,
        stpId: {
          N: 30159,
          S: 30160,  
        } 
      },
      {
        name: 'Cumberland',
        staId: 40230,
        stpId: {
          N: 30044,
          S: 30045,  
        } 
      },
      {
        name: 'Harlem',
        staId: 40750,
        stpId: {
          N: 30145,
          S: 30146,  
        } 
      },
      {
        name: 'Jefferson Park',
        staId: 41280,
        stpId: {
          N: 30247,
          S: 30248,  
        } 
      },
      {
        name: 'Montrose',
        staId: 41330,
        stpId: {
          N: 30259,
          S: 30260,  
        } 
      },
      {
        name: 'Irving Park',
        staId: 40550,
        stpId: {
          N: 30107,
          S: 30108,  
        } 
      },
      {
        name: 'Addison',
        staId: 41240 ,
        stpId: {
          N: 30239,
          S: 30240,  
        } 
      },
      {
        name: 'Belmont',
        staId: 40060,
        stpId: {
          N: 30012,
          S: 30013,  
        } 
      },
      {
        name: 'Logan Square',
        staId: 41020,
        stpId: {
          N: 30197,
          S: 30198,  
        } 
      },
      {
        name: 'California',
        staId: 40570,
        stpId: {
          N: 30111,
          S: 30112,  
        } 
      },
      {
        name: 'Western',
        staId: 40670,
        stpId: {
          N: 30129,
          S: 30130,  
        } 
      },
      {
        name: 'Damen/Milwaukee',
        staId: 40590,
        stpId: {
          N: 30115,
          S: 30116,  
        } 
      },
      {
        name: 'Division',
        staId: 40320,
        stpId: {
          N: 30062,
          S: 30063,  
        } 
      },
      {
        name: 'Chicago',
        staId: 41410 ,
        stpId: {
          N: 30271,
          S: 30272,  
        } 
      },
      {
        name: 'Grand/Milwaukee',
        staId: 40490,
        stpId: {
          N: 30095,
          S: 30096,  
        } 
      },
      {
        name: 'Washington',
        staId: 40370,
        stpId: {
          N: 30072,
          S: 30073,  
        } 
      },
      {
        name: 'Monroe',
        staId: 40790 ,
        stpId: {
          N: 30153,
          S: 30154,  
        } 
      },
      {
        name: 'Jackson/Dearborn',
        staId: 40070,
        stpId: {
          N: 30014,
          S: 30015,  
        } 
      },
      {
        name: 'LaSalle',
        staId: 41340,
        stpId: {
          E: 30261,   //change to E (O'Hare bound) and W
          W: 30262,  
        } 
      },
      {
        name: 'Clinton',
        staId: 40430,
        stpId: {
          E: 30084,
          W: 30085,  
        } 
      },
      {
        name: 'UIC-Halsted',
        staId: 40350,
        stpId: {
          E: 30068,
          W: 30069,  
        } 
      },
      {
        name: 'Racine',
        staId: 40470,
        stpId: {
          E: 30092,
          W: 30093,  
        } 
      },
      {
        name: 'Illinois Medical District',
        staId: 40810,
        stpId: {
          E: 30157,
          W: 30158,  
        } 
      },
      {
        name: 'Western', // two Western's in blue line
        staId: 40220,
        stpId: {
          E: 30042,
          W: 30043,  
        } 
      },
      {
        name: 'Kedzie-Homan',
        staId: 40250,
        stpId: {
          E: 30048,
          W: 30049,  
        } 
      },
      {
        name: 'Pulaski',
        staId: 40920,
        stpId: {
          E: 30179,
          W: 30180,  
        } 
      },
      {
        name: 'Cicero',
        staId: 40970,
        stpId: {
          E: 30187,
          W: 30188,  
        } 
      },
      {
        name: 'Austin',
        staId: 40010,
        stpId: {
          E: 30001,
          W: 30002,  
        } 
      },
      {
        name: 'Oak Park',
        staId: 40180 ,
        stpId: {
          E: 30034,
          W: 30035,  
        } 
      },
      {
        name: 'Harlem', //two Harlem's in blue line
        staId: 40980,
        stpId: {
          E: 30189,
          W: 30190,  
        } 
      },
      {
        name: 'Forest Park',
        staId: 40390,
        stpId: {
          E: 30076,
          W: 30077,  
        } 
      },
      // 'Racine',
      // 'Illinois Medical District',
      // 'Western',
      // 'Kedzie-Homan',
      // 'Pulaski',
      // 'Cicero',
      // 'Austin',
      // 'Oak Park',
      // 'Harlem',
      // 'Forest Park'
    ],
    boundFor: {
      1: {
        name: 'O\'Hare',
        direction: 'N',
        direction2: 'E',
        key: 1
      },
      5: {
        name: 'Forest Park',
        direction: 'S',
        direction2: 'W',
        key: 5
      }
    }
  },
  {
    name: 'green',
    rt: 'G',
    textcolor: 'white',
    stops: [
      {
        name: 'Harlem/Lake',
        staId: 40020,
        stpId: {
          E: 30003,
          W: 30004,  
        } 
      },
      {
        name: 'Oak Park',
        staId: 41350,
        stpId: {
          E: 30263,
          W: 30264,  
        } 
      },
      {
        name: 'Ridgeland',
        staId: 40610,
        stpId: {
          E: 30119,
          W: 30120,  
        } 
      },
      {
        name: 'Austin',
        staId: 40010,
        stpId: {
          E: 30001,
          W: 30002,  
        } 
      },
      {
        name: 'Central',
        staId: 40280,
        stpId: {
          E: 30054,
          W: 30055,  
        } 
      },
      {
        name: 'Laramie',
        staId: 40700,
        stpId: {
          E: 30135,
          W: 30136,  
        } 
      },
      {
        name: 'Cicero',
        staId: 40480,
        stpId: {
          E: 30094,
          W: 30009,  
        } 
      },
      {
        name: 'Pulaski',
        staId: 40030,
        stpId: {
          E: 30005,
          W: 30006,  
        } 
      },
      {
        name: 'Conservatory',
        staId: 41670 ,
        stpId: {
          E: 30291,
          W: 30292,  
        } 
      },
      {
        name: 'Kedzie',
        staId: 41070,
        stpId: {
          E: 30207,
          W: 30208,  
        } 
      },
      {
        name: 'California',
        staId: 41360,
        stpId: {
          E: 30265,
          W: 30266,  
        } 
      },
      {
        name: 'Ashland',
        staId: 40170,
        stpId: {
          E: 30033,
          W: 30032,  
        } 
      },
      {
        name: 'Morgan',
        staId: 41510,
        stpId: {
          E: 30295,
          W: 30296,  
        }  
      },
      {
        name: 'Clinton',
        staId: 41160 ,
        stpId: {
          E: 30221,
          W: 30222,  
        } 
      },
      {
        name: 'Clark/Lake',
        staId: 40380 ,
        stpId: {
          E: 30074, //Inner Loop
          W: 30075,  //Outer Loop 
        } 
      },
      {
        name: 'State/Lake',
        staId: 40260,
        stpId: {
          E: 30050,
          W: 30051,  
        } 
      },
      {
        name: 'Washington/Wabash',
        staId: 41700,
        stpId: {
          N: 30383, //Outer
          S: 30384, //Inner  
        } 
      },
      {
        name: 'Adams/Wabash',
        staId: 40680,
        stpId: {
          N: 30131,
          S: 30132,  
        } 
      },
      {
        name: 'Roosevelt',
        staId: 41400,
        stpId: {
          N: 30080,
          S: 30081,  
        } 
      },
      {
        name: 'Cermak-McCormick Place',
        staId: 41690,
        stpId: {
          N: 30381,
          S: 30382,  
        } 
      },
      // {
      //   name: '35th-Bronzeville-IIT',
      //   staId: 4,
      //   stpId: {
      //     E: 3,
      //     W: 3,  
      //   } 
      // },
      // {
      //   name: 'Indiana',
      //   staId: 4,
      //   stpId: {
      //     E: 3,
      //     W: 3,  
      //   } 
      // },
      // {
      //   name: '43rd',
      //   staId: 4,
      //   stpId: {
      //     E: 3,
      //     W: 3,  
      //   } 
      // },
      // {
      //   name: '47th',
      //   staId: 4,
      //   stpId: {
      //     E: 3,
      //     W: 3,  
      //   } 
      // },
      // {
      //   name: '51st',
      //   staId: 4,
      //   stpId: {
      //     E: 3,
      //     W: 3,  
      //   } 
      // },
      // {
      //   name: 'Garfield',
      //   staId: 4,
      //   stpId: {
      //     E: 3,
      //     W: 3,  
      //   } 
      // },
      // {
      //   name: 'Kind Drive',       // Kind Drive (Harlem-bound boarding only) Cottage Grove branch,
      //   staId: 4,
      //   stpId: {
      //     E: 3,
      //     W: 3,  
      //   } 
      // },
      // {
      //   name: 'Cottage Grove',
      //   staId: 4,
      //   stpId: {
      //     E: 3,
      //     W: 3,  
      //   } 
      // },
      // {
      //   name: 'Halsted',       // Halsted (Ashland branch),
      //   staId: 4,
      //   stpId: {
      //     E: 3,
      //     W: 3,  
      //   } 
      // },
      // {
      //   name: 'Ashland/63rd',
      //   staId: 4,
      //   stpId: {
      //     E: 3,
      //     W: 3,  
      //   } 
      // },

    ],
    boundFor: {
      1: {
        name: 'Harlem',
        direction: 'W',
        key: 1
      },
      5: {
        name: '63rd',
        direction: 'E',
        key: 5
      },

    }

  },
  {
    name: 'orange',
    rt: 'Org',
    textcolor: 'black',
    stops: [
      {
        name: 'Midway',
        staId: 40930,
        stpId: {
          N: 30181,
          S: 30182,  
        } 
      },
      {
        name: 'Pulaski',
        staId: 40960,
        stpId: {
          N: 30185,
          S: 30186,  
        } 
      },
      {
        name: 'Kedzie',
        staId: 41150,
        stpId: {
          N: 30219,
          S: 30220,  
        } 
      },
      {
        name: 'Western',
        staId: 40310,
        stpId: {
          N: 30060,
          S: 30061,  
        } 
      },
      {
        name: '35th/Archer',
        staId: 40120,
        stpId: {
          N: 30022,
          S: 30023,  
        } 
      },
      {
        name: 'Ashland',
        staId: 41060,
        stpId: {
          N: 30205,
          S: 30206,  
        } 
      },
      {
        name: 'Halsted',
        staId: 41130,
        stpId: {
          N: 30215,
          S: 30216,  
        } 
      },
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
    boundFor: {
      1: {
        name: 'Midway',
        direction: 'S',
        key: 1
      },
      3: {
        name: 'Midway',
        direction: 'S',
        key: 3, //
        loopStartStaArrayIndex: 8, //array index for H.W. Library
      },
      5: {
        name: 'Loop',
        direction: 'N',
        key: 5
      },
    }
  },
  {
    name: 'brown',
    rt: 'Brn',
    textcolor: 'white',
    stops: [
      {
        name: 'Kimball',
        staId: 41290 ,
        stpId: {
          N: 30249,
          S: 30250
        } 
      },
      // Kimball,
      // Kedzie,
      // Francisco,
      // Rockwell,
      // Western,
      // Damen,
      // Montrose,
      // Irving Park,
      // Addison,
      // Paulina,
      // Southport,
      // Belmont,
      // Wellington,
      // Diversey,
      // Fullerton,
      // Armitage,
      // Sedgwick,
      // Chicago,
      // Merchandise Mart,
      // Washington/Wells,
      // Quincy,
      // LaSalle/Van Buren,
      // Harold Washington Library-State/Van Buren
      // Adams/Wabash,
      // Washington/Wabash,
      // State/Lake,
      // Clark/Lake,
    ]
  },
  {
    name: 'purple',
    rt: 'P',
    textcolor: 'white',
    stops: [
      // Linden,
      // Central,
      // Noyes,
      // Foster,
      // Davis,
      // Dempster,
      // Main,
      // South Blvd,
      // Howard,
      // //starts express
      // Wilson,
      // Belmont,
      // Wellington,
      // Diversey,
      // Fullerton,
      // Armitage,
      // Sedgwick,
      // Chicago,
      // Merchandise Mart,
      // Clark/Lake,
      // State/Lake,
      // Washington/Wabash,
      // Adams/Wabash,
      // Harold Washington Library-State/Van Buren,
      // LaSalle/Van Buren,
      // Quincy,
      // Washington/Wells,
    ]
  },
  {
    name: 'yellow',
    rt: 'Y',
    textcolor: 'black',
    stops: [
      // Demster-Skokie,
      // Oakton-Skokie,
      // Howard
    ]
  },
  {
    name: 'pink',
    rt: 'Pink',
    textcolor: 'black',
    stops: [
      // 54th/Cermak,
      // Cicero,
      // Kostner,
      // Pulaski,
      // Central Park,
      // Kedzie,
      // California,
      // Western,
      // Damen,
      // 18th,
      // Polk,
      // Ashland,
      // Morgan,
      // Clinton,
      // Clark/Lake,
      // State/Lake,
      // Washington/Wabsh,
      // Adams/Wabash,
      // Harold Washington Library-State/Van Buren,
      // LaSalle/Van Buren,
      // Quincy,
      // Washington/Wells,
    ]
  }
]
