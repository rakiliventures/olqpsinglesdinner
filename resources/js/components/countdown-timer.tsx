import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center gap-2 text-amber-200">
      <span className="text-xs font-medium">Event in:</span>
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && (
          <span className="text-xs font-bold">
            {timeLeft.days}d
          </span>
        )}
        <span className="text-xs font-bold">
          {timeLeft.hours.toString().padStart(2, '0')}h
        </span>
        <span className="text-xs font-bold">
          {timeLeft.minutes.toString().padStart(2, '0')}m
        </span>
        <span className="text-xs font-bold">
          {timeLeft.seconds.toString().padStart(2, '0')}s
        </span>
      </div>
    </div>
  )
}
