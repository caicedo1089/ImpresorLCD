class pChar {
    constructor(char) 
    {
        //Normalizo el caracter
        char = char || ''
        char += ''

        this.chars = '0123456789'

        if(char.length != 1 || this.chars.indexOf(char)==-1)
        {
            throw 'Error caracter no está soportado'
        }

        this.baseArrChar = []
        
        switch (char) 
        {
            case '0':
                this.baseArrChar = [
                    '---',
                    '| |',
                    '| |',
                    '| |',
                    '---',
                ]
                break
            case '1':
                this.baseArrChar = [
                    '  |',
                    '  |',
                    '  |',
                    '  |',
                    '  |',
                ]
                break
            case '2':
                this.baseArrChar = [
                    '---',
                    '  |',
                    '---',
                    '|  ',
                    '---',
                ]
                break
            case '3':
                this.baseArrChar = [
                    '---',
                    '  |',
                    '---',
                    '  |',
                    '---',
                ]
                break
            case '4':
                this.baseArrChar = [
                    '| |',
                    '| |',
                    '---',
                    '  |',
                    '  |',
                ]
                break
            case '5':
                this.baseArrChar = [
                    '---',
                    '|  ',
                    '---',
                    '  |',
                    '---',
                ]
                break
            case '6':
                this.baseArrChar = [
                    '---',
                    '|  ',
                    '---',
                    '| |',
                    '---',
                ]
                break
            case '7':
                this.baseArrChar = [
                    '---',
                    '  |',
                    '  |',
                    '  |',
                    '  |',
                ]
                break
            case '8':
                this.baseArrChar = [
                    '---',
                    '| |',
                    '---',
                    '| |',
                    '---',
                ]
                break
            case '9':
                this.baseArrChar = [
                    '---',
                    '| |',
                    '---',
                    '  |',
                    '---',
                ]
                break
        }
    }

    scalate(columns, rows)
    {
        let result = []

        let half = Math.round(rows / 2) -1
        
        for(let i=0; i<rows; ++i)
        {
            let line = ''
            
            if(i==0)
            {
                line = this.baseArrChar[0]
            }
            else
            if(i + 1 == rows )
            {
                line = this.baseArrChar[4]
            }
            else
            if(i == half)
            {
                line = this.baseArrChar[2]
            }
            else
            if(i<half)
            {
                line = this.baseArrChar[1]
            }
            else
            {
                line = this.baseArrChar[3]
            }
            
            let myLine = ''
            for(let j=1; j<(columns-1); ++j)
            {
                myLine += line[1] 
            }

            result.push(`${line[0]}${myLine}${line[2]}`)
        }

        return result
    }
}

class pLCD{
    constructor(size, number)
    {
        this.size = size
        this.number = number
        this.objMemory = {}
        this.strSpace = ' '
    }

    print()
    {
        let columns = this.size + 2, 
            rows = this.size * 2 + 3,
            result = undefined
        
        for(let i=0; i<this.number.length; ++i)
        {
            let char = this.number[i]
            if(!this.objMemory[char])
            {
                this.objMemory[char] = new pChar(char)
            }

            let arrDig = this.objMemory[char].scalate(columns, rows)
            
            if(result)
            {
                let me = this
                result = arrDig.map((x, index) => {
                    return result[index] += `${me.strSpace}${x}`
                })
            }
            else
            {
                result = arrDig
            }
        }
        
        return result.join('\n')
    }
}

////// Ejecución de la Aplicación //////

let input = '2,12345 3,67890 0,0'
let arrLines = input.split(' ')

for(let i=0; i<arrLines.length; ++i)
{
    let lineIn = arrLines[i]
    if(lineIn == '0,0')
    {
        break
    }

    let numbers = lineIn.split(',')
    let size = parseInt(numbers[0])
    let number = numbers[1]

    console.log(`${new pLCD(size, number).print()}\n`)
}