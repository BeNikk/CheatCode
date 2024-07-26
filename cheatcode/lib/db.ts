import {  PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();


interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  testCases: { input: any; output: any }[];
}

export const createProblem = async (problemData: Problem) => {
  try {
    const createdProblem = await prisma.problem.create({
      data: problemData,
    });
    return createdProblem;
  } catch (error) {
    console.error('Error creating problem:', error);
    throw error;
  }
};
const problem1 = {
  id: 'problem1',
  title: 'Two Sum',
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  difficulty:"Easy",
  testCases: [
    { input: [2, 7, 11, 15], target: 9, output: [0, 1] },
    { input: [3, 2, 4], target: 6, output: [1, 2] },
  ],
};



createProblem(problem1);


