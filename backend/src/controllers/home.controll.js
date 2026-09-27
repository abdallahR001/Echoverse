import prisma from "../config/prisma.js"

export const getHome = async (req,res,next) =>
{
    try {
        const {id} = req.user

    const user = await prisma.user.findUnique(
        {
            where:{
                id
            },
            select:{
                id:true,
                name:true,    
            }
        }
    )

    if(!user)
    {
        const error = new Error("user not found")
        error.status = 401
    
        throw error
    }

    // get current universe

    const currentUniverse = await prisma.userUniverse.findFirst(
        {
            where:{
                userId:id,
                status:"ACTIVE"
            },
            select:{
                id:true,
                status:true,
                universe:{
                    select:{
                        id:true,
                        description:true,
                        universeCode:true
                    }
                }
            },
            orderBy:{
                created_at:"desc"
            }
        }
    )

    const enteredUniverses = await prisma.userUniverse.findMany({
        where:{
            userId:id
        },
        include:{
            universe:true
        }
    })

    const universesToExplore = await prisma.universe.findMany(
        {
            where:{
                id:{
                    not:currentUniverse?.universe.id
                }
            }
        }
    )

    return res.json(
        {
            user,
            currentUniverse,
            enteredUniverses,
            universesToExplore
        }
    )
    } catch (error) {
        console.log(error)

        next(error)
    }
}