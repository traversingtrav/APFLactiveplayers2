const mysql= require('mysql');
const dotenv= require('dotenv');
let instance=null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});
connection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log('db'+ connection.state);
});

class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject)=> {
                const query ="SELECT * FROM players;";

                connection.query(query, (err,results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            //console.log("DB get all",response);
            return response;
            
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewPlayer(player) {
        
        try {
            const playernum = player.playernum;
            const pos = player.pos;
            const name = player.name;
            const spd = player.spd;
            const str = player.str;
            const agl = player.agl;
            const gence = player.int;
            const dis = player.dis;
            const total = player.total;
            const exp = player.exp;
            const team = player.team;
            const college = player.college;
            const awards = player.awards;
            
            const insertId = await new Promise((resolve, reject)=> {

            const query ="INSERT INTO players (playernum, pos, name, spd, str, agl, gence, dis, total, exp, team, college, awards) Values (?,?,?,?,?,?,?,?,?,?,?,?,?);";

            connection.query(query, [playernum, pos, name, spd, str, agl, gence, dis, total, exp, team, college, awards] ,(err,result) => {
                if (err) reject(new Error(err.message));
                resolve(result.insertid);
            })
        });

        return {
            id : insertId,
            playernum : playernum,
            pos : pos,
            name : name,
            spd :spd,
            str: str,
            agl :agl,
            gence: gence,
            dis: dis,
            total: total,
            exp: exp,
            team: team,
            college: college,
            awards: awards
        };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
    try {

        id = parseInt(id, 10);
        const response = await new Promise((resolve, reject)=> {
        const query ="DELETE FROM players Where id = ?";

        connection.query(query, [id] ,(err,result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
        })
    });
    return response === 1 ? true :false; 
    
    } catch (error) {
        console.log(error);
        return false;
    }
}
    async updatePlayerById(playerUpdate){
        try{
            
            const playernum = playerUpdate.playernum;
            const pos = playerUpdate.pos;
            const name = playerUpdate.name;
            const spd = playerUpdate.spd;
            const str = playerUpdate.str;
            const agl = playerUpdate.agl;
            const gence = playerUpdate.int;
            const dis = playerUpdate.dis;
            const total = playerUpdate.total;
            const exp = playerUpdate.exp;
            const team = playerUpdate.team;
            const college = playerUpdate.college;
            const awards = playerUpdate.awards;
            const id = parseInt(playerUpdate.id, 10);
           
            const response = await new Promise((resolve, reject)=> {
            const query ="UPDATE players SET playernum = ?, pos = ?, name = ?, spd = ?, str = ?, agl = ?, gence = ?, dis = ?, total = ?, exp = ?, team = ?, college = ?, awards = ? WHERE id = ?";

        connection.query(query, [playernum, pos, name, spd, str, agl, gence, dis, total, exp, team, college, awards, id] ,(err,result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
        })
    });
    console.log("update",response);
    return response === 1 ? true :false; 
    
    } catch (error) {
        console.log(error);
        return false;
    }
}
async searchPlayer(player) {
    try {
  
        const playernum = player.playernum
        const pos = player.pos;
        const name = player.name;
        const spd = player.spd;
        const str = player.str;
        const agl = player.agl;
        const gence = player.int;
        const dis = player.dis;
        const total = player.total;
        const exp = player.exp;
        const team = player.team;
        const college = player.college
        const awards = player.awards

        console.log(playernum)
        const response = await new Promise((resolve, reject)=> {
            const query ="SELECT * FROM players WHERE playernum = (CASE WHEN ? = '' THEN playernum Else ? END) AND (pos = CASE WHEN ? = '' THEN pos Else ? END) AND (name = CASE WHEN ? = '' THEN name Else ? END) AND (spd = CASE WHEN ? = '' THEN spd Else ? END) AND (str = CASE WHEN ? = '' THEN str Else ? END) AND (agl = CASE WHEN ? = '' THEN agl Else ? END) And (gence = CASE WHEN ? = '' THEN gence Else ? END) AND (dis = CASE WHEN ? = '' THEN dis Else ? END) AND (total = CASE WHEN ? = '' THEN total Else ? END) AND (exp = CASE WHEN ? = '' THEN exp Else ? END) AND (team = CASE WHEN ? = '' THEN team Else ? END) AND (college = CASE WHEN ? = '' THEN college Else ? END) And (awards = CASE WHEN ? = '' THEN awards Else ? END);";
        connection.query(query, [playernum, playernum, pos, pos, name, name, spd, spd, str, str, agl, agl, gence, gence, dis, dis, total, total, exp, exp, team, team, college, college, awards, awards], (err,results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response; 
        
    } catch (error) {
        console.log(error);
    }
}
}
   


module.exports = DbService;

