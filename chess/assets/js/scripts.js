const CANVAS = document.getElementById("chessBoard");

const BOARDSIZE = 600;

CANVAS.setAttribute("width",BOARDSIZE+"px");
CANVAS.setAttribute("height",BOARDSIZE+"px");

const HALFBOARDSIZE = BOARDSIZE / 2; 

CANVAS.style.margin = -(HALFBOARDSIZE)+"px 0 0 "+-(HALFBOARDSIZE)+"px";

const FRAME = 15;
const FIELDPOSITION = CANVAS.width * (FRAME / 200);
const FIELDSIZE = (BOARDSIZE - (BOARDSIZE * (FRAME / 100))) / 8;

const FONTSIZE = BOARDSIZE * 0.20;

const CTX = CANVAS.getContext("2d");

const SQUARES = [
    {
        "name":"A1",
        "cordinates":[FIELDPOSITION,FIELDPOSITION]
    },
    {
        "name":"B1",
        "cordinates":[FIELDPOSITION + FIELDSIZE,FIELDPOSITION]
    },
    {
        "name":"C1",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 2),FIELDPOSITION]
    },
    {
        "name":"D1",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 3),FIELDPOSITION]
    },
    {
        "name":"E1",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 4),FIELDPOSITION]
    },
    {
        "name":"F1",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 5),FIELDPOSITION]
    },
    {
        "name":"G1",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 6),FIELDPOSITION]
    },
    {
        "name":"H1",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 7),FIELDPOSITION]
    },
    {
        "name":"A2",
        "cordinates":[FIELDPOSITION,FIELDPOSITION + FIELDSIZE]
    },
    {
        "name":"B2",
        "cordinates":[FIELDPOSITION + FIELDSIZE,FIELDPOSITION + FIELDSIZE]
    },
    {
        "name":"C2",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 2),FIELDPOSITION + FIELDSIZE]
    },
    {
        "name":"D2",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 3),FIELDPOSITION + FIELDSIZE]
    },
    {
        "name":"E2",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 4),FIELDPOSITION + FIELDSIZE]
    },
    {
        "name":"F2",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 5),FIELDPOSITION + FIELDSIZE]
    },
    {
        "name":"G2",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 6),FIELDPOSITION + FIELDSIZE]
    },
    {
        "name":"H2",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 7),FIELDPOSITION + FIELDSIZE]
    },
    {
        "name":"A3",
        "cordinates":[FIELDPOSITION,FIELDPOSITION + (FIELDSIZE * 2)]
    },
    {
        "name":"B3",
        "cordinates":[FIELDPOSITION + FIELDSIZE,FIELDPOSITION + (FIELDSIZE * 2)]
    },
    {
        "name":"C3",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 2),FIELDPOSITION + (FIELDSIZE * 2)]
    },
    {
        "name":"D3",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 3),FIELDPOSITION + (FIELDSIZE * 2)]
    },
    {
        "name":"E3",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 4),FIELDPOSITION + (FIELDSIZE * 2)]
    },
    {
        "name":"F3",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 5),FIELDPOSITION + (FIELDSIZE * 2)]
    },
    {
        "name":"G3",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 6),FIELDPOSITION + (FIELDSIZE * 2)]
    },
    {
        "name":"H3",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 7),FIELDPOSITION + (FIELDSIZE * 2)]
    },
    {
        "name":"A4",
        "cordinates":[FIELDPOSITION,FIELDPOSITION + (FIELDSIZE * 3)]
    },
    {
        "name":"B4",
        "cordinates":[FIELDPOSITION + FIELDSIZE,FIELDPOSITION + (FIELDSIZE * 3)]
    },
    {
        "name":"C4",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 2),FIELDPOSITION + (FIELDSIZE * 3)]
    },
    {
        "name":"D4",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 3),FIELDPOSITION + (FIELDSIZE * 3)]
    },
    {
        "name":"E4",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 4),FIELDPOSITION + (FIELDSIZE * 3)]
    },
    {
        "name":"F4",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 5),FIELDPOSITION + (FIELDSIZE * 3)]
    },
    {
        "name":"G4",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 6),FIELDPOSITION + (FIELDSIZE * 3)]
    },
    {
        "name":"H4",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 7),FIELDPOSITION + (FIELDSIZE * 3)]
    },
    {
        "name":"A5",
        "cordinates":[FIELDPOSITION,FIELDPOSITION + (FIELDSIZE * 4)]
    },
    {
        "name":"B5",
        "cordinates":[FIELDPOSITION + FIELDSIZE,FIELDPOSITION + (FIELDSIZE * 4)]
    },
    {
        "name":"C5",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 2),FIELDPOSITION + (FIELDSIZE * 4)]
    },
    {
        "name":"D5",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 3),FIELDPOSITION + (FIELDSIZE * 4)]
    },
    {
        "name":"E5",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 4),FIELDPOSITION + (FIELDSIZE * 4)]
    },
    {
        "name":"F5",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 5),FIELDPOSITION + (FIELDSIZE * 4)]
    },
    {
        "name":"G5",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 6),FIELDPOSITION + (FIELDSIZE * 4)]
    },
    {
        "name":"H5",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 7),FIELDPOSITION + (FIELDSIZE * 4)]
    },
    {
        "name":"A6",
        "cordinates":[FIELDPOSITION,FIELDPOSITION + (FIELDSIZE * 5)]
    },
    {
        "name":"B6",
        "cordinates":[FIELDPOSITION + FIELDSIZE,FIELDPOSITION + (FIELDSIZE * 5)]
    },
    {
        "name":"C6",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 2),FIELDPOSITION + (FIELDSIZE * 5)]
    },
    {
        "name":"D6",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 3),FIELDPOSITION + (FIELDSIZE * 5)]
    },
    {
        "name":"E6",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 4),FIELDPOSITION + (FIELDSIZE * 5)]
    },
    {
        "name":"F6",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 5),FIELDPOSITION + (FIELDSIZE * 5)]
    },
    {
        "name":"G6",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 6),FIELDPOSITION + (FIELDSIZE * 5)]
    },
    {
        "name":"H6",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 7),FIELDPOSITION + (FIELDSIZE * 5)]
    },
    {
        "name":"A7",
        "cordinates":[FIELDPOSITION,FIELDPOSITION + (FIELDSIZE * 6)]
    },
    {
        "name":"B7",
        "cordinates":[FIELDPOSITION + FIELDSIZE,FIELDPOSITION + (FIELDSIZE * 6)]
    },
    {
        "name":"C7",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 2),FIELDPOSITION + (FIELDSIZE * 6)]
    },
    {
        "name":"D7",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 3),FIELDPOSITION + (FIELDSIZE * 6)]
    },
    {
        "name":"E7",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 4),FIELDPOSITION + (FIELDSIZE * 6)]
    },
    {
        "name":"F7",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 5),FIELDPOSITION + (FIELDSIZE * 6)]
    },
    {
        "name":"G7",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 6),FIELDPOSITION + (FIELDSIZE * 6)]
    },
    {
        "name":"H7",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 7),FIELDPOSITION + (FIELDSIZE * 6)]
    },
    {
        "name":"A8",
        "cordinates":[FIELDPOSITION,FIELDPOSITION + (FIELDSIZE * 7)]
    },
    {
        "name":"B8",
        "cordinates":[FIELDPOSITION + FIELDSIZE,FIELDPOSITION + (FIELDSIZE * 7)]
    },
    {
        "name":"C8",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 2),FIELDPOSITION + (FIELDSIZE * 7)]
    },
    {
        "name":"D8",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 3),FIELDPOSITION + (FIELDSIZE * 7)]
    },
    {
        "name":"E8",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 4),FIELDPOSITION + (FIELDSIZE * 7)]
    },
    {
        "name":"F8",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 5),FIELDPOSITION + (FIELDSIZE * 7)]
    },
    {
        "name":"G8",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 6),FIELDPOSITION + (FIELDSIZE * 7)]
    },
    {
        "name":"H8",
        "cordinates":[FIELDPOSITION + (FIELDSIZE * 7),FIELDPOSITION + (FIELDSIZE * 7)]
    }              
];

var pieces = {
    "black":[
            {
                "name":"pawn1",
                "cordinates":[SQUARES.filter(square=> square.name == "A2")[0].cordinates[0],SQUARES.filter(square=> square.name == "A2")[0].cordinates[1]] 
            },
            {
                "name":"pawn2",
                "cordinates":[SQUARES.filter(square=> square.name == "B2")[0].cordinates[0],SQUARES.filter(square=> square.name == "B2")[0].cordinates[1]] 
            },
            {
                "name":"pawn3",
                "cordinates":[SQUARES.filter(square=> square.name == "C2")[0].cordinates[0],SQUARES.filter(square=> square.name == "C2")[0].cordinates[1]] 
            },
            {
                "name":"pawn4",
                "cordinates":[SQUARES.filter(square=> square.name == "D2")[0].cordinates[0],SQUARES.filter(square=> square.name == "D2")[0].cordinates[1]] 
            },
            {
                "name":"pawn5",
                "cordinates":[SQUARES.filter(square=> square.name == "E2")[0].cordinates[0],SQUARES.filter(square=> square.name == "E2")[0].cordinates[1]] 
            },
            {
                "name":"pawn6",
                "cordinates":[SQUARES.filter(square=> square.name == "F2")[0].cordinates[0],SQUARES.filter(square=> square.name == "F2")[0].cordinates[1]] 
            },
            {
                "name":"pawn7",
                "cordinates":[SQUARES.filter(square=> square.name == "G2")[0].cordinates[0],SQUARES.filter(square=> square.name == "G2")[0].cordinates[1]] 
            },
            {
                "name":"pawn8",
                "cordinates":[SQUARES.filter(square=> square.name == "H2")[0].cordinates[0],SQUARES.filter(square=> square.name == "H2")[0].cordinates[1]] 
            },
            {
                "name":"rock1",
                "cordinates":[SQUARES.filter(square=> square.name == "A1")[0].cordinates[0],SQUARES.filter(square=> square.name == "A1")[0].cordinates[1]] 
            },
            {
                "name":"rock2",
                "cordinates":[SQUARES.filter(square=> square.name == "H1")[0].cordinates[0],SQUARES.filter(square=> square.name == "H1")[0].cordinates[1]] 
            },
            {
                "name":"knight1",
                "cordinates":[SQUARES.filter(square=> square.name == "B1")[0].cordinates[0],SQUARES.filter(square=> square.name == "B1")[0].cordinates[1]] 
            },
            {
                "name":"knight2",
                "cordinates":[SQUARES.filter(square=> square.name == "G1")[0].cordinates[0],SQUARES.filter(square=> square.name == "G1")[0].cordinates[1]] 
            },
            {
                "name":"bishop1",
                "cordinates":[SQUARES.filter(square=> square.name == "C1")[0].cordinates[0],SQUARES.filter(square=> square.name == "C1")[0].cordinates[1]] 
            },
            {
                "name":"bishop2",
                "cordinates":[SQUARES.filter(square=> square.name == "F1")[0].cordinates[0],SQUARES.filter(square=> square.name == "F1")[0].cordinates[1]] 
            },
            {
                "name":"queen",
                "cordinates":[SQUARES.filter(square=> square.name == "D1")[0].cordinates[0],SQUARES.filter(square=> square.name == "D1")[0].cordinates[1]] 
            },
            {
                "name":"king",
                "cordinates":[SQUARES.filter(square=> square.name == "E1")[0].cordinates[0],SQUARES.filter(square=> square.name == "E1")[0].cordinates[1]] 
            }

    ],
    "white":[
        {
            "name":"pawn1",
            "cordinates":[SQUARES.filter(square=> square.name == "A7")[0].cordinates[0],SQUARES.filter(square=> square.name == "A7")[0].cordinates[1]] 
        },
        {
            "name":"pawn2",
            "cordinates":[SQUARES.filter(square=> square.name == "B7")[0].cordinates[0],SQUARES.filter(square=> square.name == "B7")[0].cordinates[1]] 
        },
        {
            "name":"pawn3",
            "cordinates":[SQUARES.filter(square=> square.name == "C7")[0].cordinates[0],SQUARES.filter(square=> square.name == "C7")[0].cordinates[1]] 
        },
        {
            "name":"pawn4",
            "cordinates":[SQUARES.filter(square=> square.name == "D7")[0].cordinates[0],SQUARES.filter(square=> square.name == "D7")[0].cordinates[1]] 
        },
        {
            "name":"pawn5",
            "cordinates":[SQUARES.filter(square=> square.name == "E7")[0].cordinates[0],SQUARES.filter(square=> square.name == "E7")[0].cordinates[1]] 
        },
        {
            "name":"pawn6",
            "cordinates":[SQUARES.filter(square=> square.name == "F7")[0].cordinates[0],SQUARES.filter(square=> square.name == "F7")[0].cordinates[1]] 
        },
        {
            "name":"pawn7",
            "cordinates":[SQUARES.filter(square=> square.name == "G7")[0].cordinates[0],SQUARES.filter(square=> square.name == "G7")[0].cordinates[1]] 
        },
        {
            "name":"pawn8",
            "cordinates":[SQUARES.filter(square=> square.name == "H7")[0].cordinates[0],SQUARES.filter(square=> square.name == "H7")[0].cordinates[1]] 
        },
        {
            "name":"rock1",
            "cordinates":[SQUARES.filter(square=> square.name == "A8")[0].cordinates[0],SQUARES.filter(square=> square.name == "A8")[0].cordinates[1]] 
        },
        {
            "name":"rock2",
            "cordinates":[SQUARES.filter(square=> square.name == "H8")[0].cordinates[0],SQUARES.filter(square=> square.name == "H8")[0].cordinates[1]] 
        },
        {
            "name":"knight1",
            "cordinates":[SQUARES.filter(square=> square.name == "B8")[0].cordinates[0],SQUARES.filter(square=> square.name == "B8")[0].cordinates[1]] 
        },
        {
            "name":"knight2",
            "cordinates":[SQUARES.filter(square=> square.name == "G8")[0].cordinates[0],SQUARES.filter(square=> square.name == "G8")[0].cordinates[1]] 
        },
        {
            "name":"bishop1",
            "cordinates":[SQUARES.filter(square=> square.name == "C8")[0].cordinates[0],SQUARES.filter(square=> square.name == "C8")[0].cordinates[1]] 
        },
        {
            "name":"bishop2",
            "cordinates":[SQUARES.filter(square=> square.name == "F8")[0].cordinates[0],SQUARES.filter(square=> square.name == "F8")[0].cordinates[1]] 
        },
        {
            "name":"queen",
            "cordinates":[SQUARES.filter(square=> square.name == "D8")[0].cordinates[0],SQUARES.filter(square=> square.name == "D8")[0].cordinates[1]] 
        },
        {
            "name":"king",
            "cordinates":[SQUARES.filter(square=> square.name == "E8")[0].cordinates[0],SQUARES.filter(square=> square.name == "E8")[0].cordinates[1]] 
        }
    ]
}; 
