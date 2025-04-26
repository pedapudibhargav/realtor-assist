'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function TeamDetail() {
  const params = useParams()
  return (
    <div>Team id:{params.teamId}</div>
  )
}
