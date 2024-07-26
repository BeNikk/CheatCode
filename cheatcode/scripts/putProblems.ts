const {PrismaClient}=require("@prisma/client");

const prisma=new PrismaClient();




 const main = async () => {
  try {
     await prisma.problem.create({
      data: {
        "id": 5,
        "title": "Climbing Stairs",
        "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        "difficulty": "Easy",
        "testCases": [
          {"input": 2, "output": 2},
          {"input": 3, "output": 3}
        ]
      }
      
      
      
      
    });
    console.log("Success");
  } catch (error) {
    console.error('Error creating problem:', error);

  }finally{
    await prisma.$disconnect();
  }
};


main();


