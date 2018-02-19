export const trainLines = [
  {
    name: 'red',
    primarycolor: '#E53935',
    textcolor: 'white',
    sectextcolor: '#FFCDD2',
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
          S: 30148,
          N: 30147,
         }
      },
      {
         name: 'Thorndale',
         staId: 40880,
         stpId: {
          S: 30170,
          N: 30169,
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
          S: 30067,
          N: 30066,
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
          S: 30106,
          N: 30105,
         }
      },
      {
         name: 'Sheridan',
         staId: 40080,
         stpId: {
          S: 30017,
          N: 30016,
         }
      },
      {
         name: 'Addison',
         staId: 41420,
         stpId: {
          S: 30274,
          N: 30273,
         }
      },
      {
         name: 'Belmont',
         staId: 41320,
         stpId: {
          S: 30256,
          N: 30255,
         }
      },
      {
         name: 'Fullerton',
         staId: 41220,
         stpId: {
          S: 30234,
          N: 30233,
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
          S: 30122,
          N: 30121,
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
          S: 30290,
          N: 30289,
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
          S: 30110,
          N: 30109,
         }
      },
      {
         name: 'Harrison',
         staId: 41490,
         stpId: {
          S: 30286,
          N: 30285,
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
          S: 30194,
          N: 30193,
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
          S: 30224,
          N: 30223,
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
          S: 30089,
          N: 30088,
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
    primarycolor: '#1976D2',
    textcolor: 'white',
    sectextcolor: '#BBDEFB',
    stops: [
      {
         name: "O\'Hare",
         staId: 40890,
         stpId: {
           S: 30172,
           N: 30171,
         },
      },
      {
         name: "Rosemont",
         staId: 40820,
         stpId: {
           N: 30159,
           S: 30160,
         },
      },
      {
         name: "Cumberland",
         staId: 40230,
         stpId: {
           N: 30044,
           S: 30045,
         },
      },
      {
         name: "Harlem",
         staId: 40750,
         stpId: {
           S: 30146,
           N: 30145,
         },
      },
      {
         name: "Jefferson Park",
         staId: 41280,
         stpId: {
           N: 30247,
           S: 30248,
         },
      },
      {
         name: "Montrose",
         staId: 41330,
         stpId: {
           S: 30260,
           N: 30259,
         },
      },
      {
         name: "Irving Park",
         staId: 40550,
         stpId: {
           N: 30107,
           S: 30108,
         },
      },
      {
         name: "Addison",
         staId: 41240,
         stpId: {
           S: 30240,
           N: 30239,
         },
      },
      {
         name: "Belmont",
         staId: 40060,
         stpId: {
           S: 30013,
           N: 30012,
         },
      },
      {
         name: "Logan Square",
         staId: 41020,
         stpId: {
           N: 30197,
           S: 30198,
         },
      },
      {
         name: "California",
         staId: 40570,
         stpId: {
           N: 30111,
           S: 30112,
         },
      },
      {
         name: "Western",
         staId: 40670,
         stpId: {
           N: 30129,
           S: 30130,
         },
      },
      {
         name: "Damen/Milwaukee",
         staId: 40590,
         stpId: {
           S: 30116,
           N: 30115,
         },
      },
      {
         name: "Division",
         staId: 40320,
         stpId: {
           N: 30062,
           S: 30063,
         },
      },
      {
         name: "Chicago",
         staId: 41410,
         stpId: {
           N: 30271,
           S: 30272,
         },
      },
      {
         name: "Grand/Milwaukee",
         staId: 40490,
         stpId: {
           S: 30096,
           N: 30095,
         },
      },
      {
         name: "Clark/Lake",
         staId: 40380,
         stpId: {
           S: 30374,
           N: 30375,
         },
      },
      {
         name: "Washington",
         staId: 40370,
         stpId: {
           S: 30073,
           N: 30072,
         },
      },
      {
         name: "Monroe",
         staId: 40790,
         stpId: {
           N: 30153,
           S: 30154,
         },
      },
      {
         name: "Jackson/Dearborn",
         staId: 40070,
         stpId: {
           N: 30014,
           S: 30015,
         },
      },
      {
         name: "LaSalle",
         staId: 41340,
         stpId: {
           S: 30262,
           N: 30261,
         },
      },
      {
         name: "Clinton",
         staId: 40430,
         stpId: {
           S: 30085,
           N: 30084,
         },
      },
      {
         name: "UIC-Halsted",
         staId: 40350,
         stpId: {
           S: 30069,
           N: 30068,
         },
      },
      {
         name: "Racine",
         staId: 40470,
         stpId: {
           S: 30093,
           N: 30092,
         },
      },
      {
         name: "Illinois Medical District",
         staId: 40810,
         stpId: {
           N: 30157,
           S: 30158,
         },
      },
      {
         name: "Western",
         staId: 40220,
         stpId: {
           N: 30042,
           S: 30043,
         },
      },
      {
         name: "Kedzie-Homan",
         staId: 40250,
         stpId: {
           S: 30049,
           N: 30048,
         },
      },
      {
         name: "Pulaski",
         staId: 40920,
         stpId: {
           S: 30180,
           N: 30179,
         },
      },
      {
         name: "Cicero",
         staId: 40970,
         stpId: {
           N: 30187,
           S: 30188,
         },
      },
      {
         name: "Austin",
         staId: 40010,
         stpId: {
           N: 30001,
           S: 30002,
         },
      },
      {
         name: "Oak Park",
         staId: 40180,
         stpId: {
           S: 30035,
           N: 30034,
         },
      },
      {
         name: "Harlem",
         staId: 40980,
         stpId: {
           N: 30189,
           S: 30190,
         },
      },
      {
         name: "Forest Park",
         staId: 40390,
         stpId: {
           S: 30077,
           N: 30076,
         },
      }
    ],
    boundFor: {
      1: {
        name: 'O\'Hare',
        direction: 'N',
        key: 1
      },
      5: {
        name: 'Forest Park',
        direction: 'S',
        key: 5
      }
    }
  },
  {
    name: 'green',
    rt: 'G',
    primarycolor: '#43A047',
    textcolor: 'white',
    sectextcolor: '#C8E6C9',
    stops: [
      {
         name: "Harlem/Lake",
         staId: 40020,
         stpId: {
           S: 30003,
           N: 30004,
         },
      },
      {
         name: "Oak Park",
         staId: 41350,
         stpId: {
           S: 30263,
           N: 30264,
         },
      },
      {
         name: "Ridgeland",
         staId: 40610,
         stpId: {
           N: 30120,
           S: 30119,
         },
      },
      {
         name: "Austin",
         staId: 41260,
         stpId: {
           S: 30243,
           N: 30244,
         },
      },
      {
         name: "Central",
         staId: 40280,
         stpId: {
           N: 30055,
           S: 30054,
         },
      },
      {
         name: "Laramie",
         staId: 40700,
         stpId: {
           S: 30135,
           N: 30136,
         },
      },
      {
         name: "Cicero",
         staId: 40480,
         stpId: {
           N: 30009,
           S: 30094,
         },
      },
      {
         name: "Pulaski",
         staId: 40030,
         stpId: {
           S: 30005,
           N: 30006,
         },
      },
      {
         name: "Conservatory",
         staId: 41670,
         stpId: {
           S: 30291,
           N: 30292,
         },
      },
      {
         name: "Kedzie",
         staId: 41070,
         stpId: {
           S: 30207,
           N: 30208,
         },
      },
      {
         name: "California",
         staId: 41360,
         stpId: {
           N: 30266,
           S: 30265,
         },
      },
      {
         name: "Ashland",
         staId: 40170,
         stpId: {
           S: 30033,
           N: 30032,
         },
      },
      {
         name: "Morgan",
         staId: 41510,
         stpId: {
           N: 30296,
           S: 30295,
         },
      },
      {
         name: "Clinton",
         staId: 41160,
         stpId: {
           N: 30222,
           S: 30221,
         },
      },
      {
         name: "Clark/Lake",
         staId: 40380,
         stpId: {
           S: 30074, //Inner Loop
           N: 30075, //Outer Loop
         },
      },
      {
         name: "State/Lake",
         staId: 40260,
         stpId: {
           N: 30051, //Outer Loop
           S: 30050, //Inner Loop
         },
      },
      {
         name: "Washington/Wabash",
         staId: 41700,
         stpId: {
           N: 30383,
           S: 30384,
         },
      },
      {
         name: "Adams/Wabash",
         staId: 40680,
         stpId: {
           S: 30132,
           N: 30131,
         },
      },
      {
         name: "Roosevelt",
         staId: 41400,
         stpId: {
           S: 30081,
           N: 30080,
         },
      },
      {
         name: "Cermak-McCormick Place",
         staId: 41690,
         stpId: {
           S: 30382,
           N: 30381,
         },
      },
      {
         name: "35th-Bronzeville-IIT",
         staId: 41120,
         stpId: {
           N: 30213,
           S: 30214,
         },
      },
      {
         name: "Indiana",
         staId: 40300,
         stpId: {
           S: 30059,
           N: 30058,
         },
      },
      {
         name: "43rd",
         staId: 41270,
         stpId: {
           N: 30245,
           S: 30246,
         },
      },
      {
         name: "47th",
         staId: 41080,
         stpId: {
           S: 30210,
           N: 30209,
         },
      },
      {
         name: "51st",
         staId: 40130,
         stpId: {
           N: 30024,
           S: 30025,
         },
      },
      {
         name: "Garfield",
         staId: 40510,
         stpId: {
           S: 30100,
           N: 30099,
         },
      },
      {
         name: "King Drive", // King Drive (Harlem-bound boarding only) Cottage Grove branch,
         staId: 41140,
         stpId: {
           S: 30217,
           N: 30218,
         },
      },
      {
         name: "Cottage Grove",
         staId: 40720,
         stpId: {
           N: 30140,
           S: 30139,
         },
      },
      {
         name: "Halsted", // Halsted (Ashland branch),
         staId: 40940,
         stpId: {
           N: 30183,
           S: 30184,
         },
      },
      {
         name: "Ashland/63rd",
         staId: 40290,
         stpId: {
           S: 30057,
           N: 30056,
         },
      }
    ],
    boundFor: {
      1: {
        name: 'Harlem',
        direction: 'N',
        // direction2: 'W',
        key: 1
      },
      5: {
        name: 'Ashland/63rd or Cottage Grove',
        direction: 'S',
        // direction2: 'E',
        key: 5
      },

    }

  },
  {
    name: 'orange',
    rt: 'Org',
    primarycolor: '#F57C00',
    textcolor: 'white',
    sectextcolor: '#FFE0B2',
    stops: [
      {
        name: "Midway",
        staId: 40930,
        stpId: {
          S: 30182,
          N: 30181,
        },
      },
      {
        name: "Pulaski",
        staId: 40960,
        stpId: {
          N: 30185,
          S: 30186,
        },
      },
      {
        name: "Kedzie",
        staId: 41150,
        stpId: {
          N: 30219,
          S: 30220,
        },
      },
      {
        name: "Western",
        staId: 40310,
        stpId: {
          S: 30061,
          N: 30060,
        },
      },
      {
        name: "35th/Archer",
        staId: 40120,
        stpId: {
          N: 30022,
          S: 30023,
        },
      },
      {
        name: "Ashland",
        staId: 41060,
        stpId: {
          N: 30205,
          S: 30206,
        },
      },
      {
        name: "Halsted",
        staId: 41130,
        stpId: {
          S: 30216,
          N: 30215,
        },
      },
      {
        name: "Roosevelt",
        staId: 41400,
        stpId: {
          S: 30081,
          N: 30080,
        },
      },
      {
        name: "Harold Washington Library",
        staId: 40850,
        stpId: {
          L: 30166,
        },
      },
      {
        name: "LaSalle/Van Buren",
        staId: 40160,
        stpId: {
          L: 30031,
        },
      },
      {
        name: "Quincy/Wells",
        staId: 40040,
        stpId: {
          L: 30007,
        },
      },
      {
        name: "Washington/Wells",
        staId: 40730,
        stpId: {
          L: 30141,
        },
      },
      {
        name: "Clark/Lake",
        staId: 40380,
        stpId: {
          L: 30074,
        },
      },
      {
        name: "State/Lake",
        staId: 40260,
        stpId: {
          L: 30050,
        },
      },
      {
        name: "Washington/Wabash",
        staId: 41700,
        stpId: {
          L: 30384,
        },
      },
      {
        name: "Adams/Wabash",
        staId: 40680,
        stpId: {
          L: 30132,
        },
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
        key: 3, //key for stops in the loop
        loopStartStaArrayIndex: 8, //array index for H.W. Library
      },
      5: {
        name: 'Loop',
        direction: 'N',
        direction2: 'L', //this is for a trip departing from South arriving to Loop (so arriving stop stpId can be found)
        key: 5
      },
    }
  },
  {
    name: 'brown',
    rt: 'Brn',
    primarycolor: '#795548',
    textcolor: 'white',
    sectextcolor: '#D7CCC8',
    stops: [
      {
         name: "Kimball",
         staId: 41290,
         stpId: {
           N: 30249,
           S: 30250,
         },
      },
      {
         name: "Kedzie",
         staId: 41180,
         stpId: {
           S: 30226,
           N: 30225,
         },
      },
      {
         name: "Francisco",
         staId: 40870,
         stpId: {
           S: 30168,
           N: 30167,
         },
      },
      {
         name: "Rockwell",
         staId: 41010,
         stpId: {
           S: 30196,
           N: 30195,
         },
      },
      {
         name: "Western",
         staId: 41480,
         stpId: {
           S: 30284,
           N: 30283,
         },
      },
      {
         name: "Damen",
         staId: 40090,
         stpId: {
           S: 30019,
           N: 30018,
         },
      },
      {
         name: "Montrose",
         staId: 41500,
         stpId: {
           N: 30287,
           S: 30288,
         },
      },
      {
         name: "Irving Park",
         staId: 41460,
         stpId: {
           S: 30282,
           N: 30281,
         },
      },
      {
         name: "Addison",
         staId: 41440,
         stpId: {
           N: 30277,
           S: 30278,
         },
      },
      {
         name: "Paulina",
         staId: 41310,
         stpId: {
           S: 30254,
           N: 30253,
         },
      },
      {
         name: "Southport",
         staId: 40360,
         stpId: {
           N: 30070,
           S: 30071,
         },
      },
      {
         name: "Belmont",
         staId: 41320,
         stpId: {
           S: 30258,
           N: 30257,
         },
      },
      {
         name: "Wellington",
         staId: 41210,
         stpId: {
           N: 30231,
           S: 30232,
         },
      },
      {
         name: "Diversey",
         staId: 40530,
         stpId: {
           N: 30103,
           S: 30104,
         },
      },
      {
         name: "Fullerton",
         staId: 41220,
         stpId: {
           S: 30236,
           N: 30235,
         },
      },
      {
         name: "Armitage",
         staId: 40660,
         stpId: {
           S: 30128,
           N: 30127,
         },
      },
      {
         name: "Sedgwick",
         staId: 40800,
         stpId: {
           N: 30155,
           S: 30156,
         },
      },
      {
         name: "Chicago",
         staId: 40710,
         stpId: {
           S: 30138,
           N: 30137,
         },
      },
      {
         name: "Merchandise Mart",
         staId: 40460,
         stpId: {
           S: 30091,
           N: 30090,
         },
      },
      {
         name: "Washington/Wells",
         staId: 40730,
         stpId: {
           L: 30142,
         },
      },
      {
         name: "Quincy/Wells",
         staId: 40040,
         stpId: {
           L: 30008,
         },
      },
      {
         name: "LaSalle/Van Buren",
         staId: 40160,
         stpId: {
           L: 30030,
         },
      },
      {
         name: "Harold Washington Library",
         staId: 40850,
         stpId: {
           L: 30165,
         },
      },
      {
         name: "Adams/Wabash",
         staId: 40680,
         stpId: {
           L: 30131,
         },
      },
      {
         name: "Washington/Wabash",
         staId: 41700,
         stpId: {
           L: 30383,
         },
      },
      {
         name: "State/Lake",
         staId: 40260,
         stpId: {
           L: 30051,
         },
      },
      {
         name: "Clark/Lake",
         staId: 40380,
         stpId: {
           L: 30075,
         },
      },
    ],
    boundFor: {
      1: {
        name: 'Kimball',
        direction: 'N',
        key: 1
      },
      3: {
        name: 'Kimball',
        direction: 'N',
        key: 3, //key for stops in the loop
        loopStartStaArrayIndex: 19, //array index for 'Washington/Wells'
      },
      5: {
        name: 'Loop',
        direction: 'S',
        direction2: 'L', //this is for a trip departing from North arriving to Loop (so arriving stop stpId can be found)
        key: 5
      },
    }
  },
  {
    name: 'purple',
    rt: 'P',
    primarycolor: '#8E24AA',
    textcolor: 'white',
    sectextcolor: '#E1BEE7',
    stops: [
      {
         name: "Linden",
         staId: 41050,
         stpId: {
           N: 30203,
           S: 30204,
         },
      },
      {
         name: "Central",
         staId: 41250,
         stpId: {
           S: 30242,
           N: 30241,
         },
      },
      {
         name: "Noyes",
         staId: 40400,
         stpId: {
           S: 30079,
           N: 30078,
         },
      },
      {
         name: "Foster",
         staId: 40520,
         stpId: {
           N: 30101,
           S: 30102,
         },
      },
      {
         name: "Davis",
         staId: 40050,
         stpId: {
           N: 30010,
           S: 30011,
         },
      },
      {
         name: "Dempster",
         staId: 40690,
         stpId: {
           N: 30133,
           S: 30134,
         },
      },
      {
         name: "Main",
         staId: 40270,
         stpId: {
           N: 30052,
           S: 30053,
         },
      },
      {
         name: "South Blvd.",
         staId: 40840,
         stpId: {
           N: 30163,
           S: 30164,
         },
      },
      {
         name: "Howard",
         staId: 40900,
         stpId: {
           S: 30176,
           N: 30175,
         },
      },
      //starts express
      {
         name: "Wilson",
         staId: 40540,
         stpId: {
           S: 30385,
           N: 30386,
         },
      },
      {
         name: "Belmont",
         staId: 41320,
         stpId: {
           S: 30258,
           N: 30257,
         },
      },
      {
         name: "Wellington",
         staId: 41210,
         stpId: {
           N: 30231,
           S: 30232,
         },
      },
      {
         name: "Diversey",
         staId: 40530,
         stpId: {
           N: 30103,
           S: 30104,
         },
      },
      {
         name: "Fullerton",
         staId: 41220,
         stpId: {
           S: 30236,
           N: 30235,
         },
      },
      {
         name: "Armitage",
         staId: 40660,
         stpId: {
           S: 30128,
           N: 30127,
         },
      },
      {
         name: "Sedgwick",
         staId: 40800,
         stpId: {
           N: 30155,
           S: 30156,
         },
      },
      {
         name: "Chicago",
         staId: 40710,
         stpId: {
           S: 30138,
           N: 30137,
         },
      },
      {
         name: "Merchandise Mart",
         staId: 40460,
         stpId: {
           S: 30091,
           N: 30090,
         },
      },
      {
         name: "Clark/Lake",
         staId: 40380,
         stpId: {
           L: 30074,
         },
      },
      {
         name: "State/Lake",
         staId: 40260,
         stpId: {
           L: 30050,
         },
      },
      {
         name: "Washington/Wabash",
         staId: 41700,
         stpId: {
           L: 30384,
         },
      },
      {
         name: "Adams/Wabash",
         staId: 40680,
         stpId: {
           L: 30132,
         },
      },
      {
         name: "Harold Washington Library",
         staId: 40850,
         stpId: {
           L: 30166,
         },
      },
      {
         name: "LaSalle/Van Buren",
         staId: 40160,
         stpId: {
           L: 30031,
         },
      },
      {
         name: "Quincy/Wells",
         staId: 40040,
         stpId: {
           L: 30007,
         },
      },
      {
         name: "Washington/Wells",
         staId: 40730,
         stpId: {
           L: 30141,
         },
      },
    ],
    boundFor: {
      1: {
        name: 'Linden',
        direction: 'N',
        key: 1
      },
      3: {
        name: 'Linden',
        direction: 'N',
        key: 3, //key for stops in the loop
        loopStartStaArrayIndex: 18, //array index for 'Clark/Lake'
      },
      5: {
        name: 'Loop',
        direction: 'S',
        direction2: 'L', //this is for a trip departing from North arriving to Loop (so arriving stop stpId can be found)
        key: 5
      },
    }
  },
  {
    name: 'yellow',
    rt: 'Y',
    primarycolor: '#FFD600',
    textcolor: 'black',
    sectextcolor: '#F57F17',
    stops: [
      {
         name: "Dempster-Skokie",
         staId: 40140,
         stpId: {
           N: 30026,
           S: 30027,
         },
      },
      {
         name: "Oakton-Skokie",
         staId: 41680,
         stpId: {
           S: 30298,
           N: 30297,
         },
      },
      {
         name: "Howard",
         staId: 40900,
         stpId: {
           S: 30176,
           N: 30175,
         },
      }
    ],
    boundFor: {
      1: {
        name: 'Dempster-Skokie',
        direction: 'N',
        key: 1
      },
      5: {
        name: 'Howard',
        direction: 'S',
        key: 5
      }
    }
  },
  {
    name: 'pink',
    rt: 'Pink',
    primarycolor: '#FF4081',
    textcolor: 'white',
    sectextcolor: '#F8BBD0',
    stops: [
      {
         name: "54th/Cermak",
         staId: 40580,
         stpId: {
           E: 30113,
           W: 30114,
         },
      },
      {
         name: "Cicero",
         staId: 40420,
         stpId: {
           W: 30083,
           E: 30082,
         },
      },
      {
         name: "Kostner",
         staId: 40600,
         stpId: {
           E: 30117,
           W: 30118,
         },
      },
      {
         name: "Pulaski",
         staId: 40150,
         stpId: {
           E: 30028,
           W: 30029,
         },
      },
      {
         name: "Central Park",
         staId: 40780,
         stpId: {
           E: 30151,
           W: 30152,
         },
      },
      {
         name: "Kedzie",
         staId: 41040,
         stpId: {
           W: 30202,
           E: 30201,
         },
      },
      {
         name: "California",
         staId: 40440,
         stpId: {
           E: 30086,
           W: 30087,
         },
      },
      {
         name: "Western",
         staId: 40740,
         stpId: {
           E: 30143,
           W: 30144,
         },
      },
      {
         name: "Damen",
         staId: 40210,
         stpId: {
           W: 30041,
           E: 30040,
         },
      },
      {
         name: "18th",
         staId: 40830,
         stpId: {
           E: 30161,
           W: 30162,
         },
      },
      {
         name: "Polk",
         staId: 41030,
         stpId: {
           W: 30200,
           E: 30199,
         },
      },
      {
         name: "Ashland",
         staId: 40170,
         stpId: {
           E: 30033,
           W: 30032,
         },
      },
      {
         name: "Morgan",
         staId: 41510,
         stpId: {
           W: 30296,
           E: 30295,
         },
      },
      {
         name: "Clinton",
         staId: 41160,
         stpId: {
           W: 30222,
           E: 30221,
         },
      },
      {
         name: "Clark/Lake",
         staId: 40380,
         stpId: {
           L: 30074,
         },
      },
      {
         name: "State/Lake",
         staId: 40260,
         stpId: {
           L: 30050,
         },
      },
      {
         name: "Washington/Wabash",
         staId: 41700,
         stpId: {
           L: 30384,
         },
      },
      {
         name: "Adams/Wabash",
         staId: 40680,
         stpId: {
           L: 30132,
         },
      },
      {
         name: "Harold Washington Library",
         staId: 40850,
         stpId: {
           L: 30166,
         },
      },
      {
         name: "LaSalle/Van Buren",
         staId: 40160,
         stpId: {
           L: 30031,
         },
      },
      {
         name: "Quincy/Wells",
         staId: 40040,
         stpId: {
           L: 30007,
         },
      },
      {
         name: "Washington/Wells",
         staId: 40730,
         stpId: {
           L: 30141,
         },
      }
    ],
    boundFor: {
      1: {
        name: '54th/Cermak',
        direction: 'W',
        key: 1
      },
      3: {
        name: '54th/Cermak',
        direction: 'W',
        key: 3, //key for stops in the loop
        loopStartStaArrayIndex: 14, //array index for 'Clark/Lake'
      },
      5: {
        name: 'Loop',
        direction: 'E',
        direction2: 'L', //this is for a trip departing from East arriving to Loop (so arriving stop stpId can be found)
        key: 5
      },
    }
  }
];

export const rushHour = {
   "30204":["5:13 AM","9:29 AM","2:21 PM","6:32 PM"],
   "30242":["5:15 AM","9:31 AM","2:23 PM","6:34 PM"],
   "30079":["5:16 AM","9:32 AM","2:24 PM","6:35 PM"],
   "30102":["5:17 AM","9:33 AM","2:25 PM","6:36 PM"],
   "30011":["5:19 AM","9:35 AM","2:27 PM","6:38 PM"],
   "30134":["5:20 AM","9:36 AM","2:28 PM","6:39 PM"],
   "30053":["5:21 AM","9:37 AM","2:29 PM","6:40 PM"],
   "30164":["5:23 AM","9:39 AM","2:31 PM","6:42 PM"],
   "30176":["5:25 AM","9:41 AM","2:33 PM","6:44 PM"]
}
