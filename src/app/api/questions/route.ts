import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'lib', 'questions_bingo.txt')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const questions = fileContent.split('\n').filter(q => q.trim() !== '')

    return NextResponse.json({ 
      questions: questions 
    })
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to load questions' },
      { status: 500 }
    )
  }
}