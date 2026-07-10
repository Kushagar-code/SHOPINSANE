'use client'

import { useState } from 'react'
export const runtime = 'edge';
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { login } from './actions'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null)
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    
    const result = await login(formData)
    if (result?.error) {
      setServerError(result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas-mist p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card className="border-faint-border bg-pure-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-gt-standard font-semibold text-ink-black">Welcome Back</CardTitle>
            <CardDescription className="text-center font-gt-standard">
              Sign in to your premium account.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {serverError && (
                <div className="p-3 text-sm text-semantic-error bg-semantic-error/10 border border-semantic-error/20 rounded-md font-gt-standard">
                  {serverError}
                </div>
              )}
              
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full rounded-pills bg-shop-violet text-pure-white hover:opacity-90 transition-opacity" isLoading={isSubmitting}>
                Sign In
              </Button>
              <div className="text-sm text-muted-gray text-center font-gt-standard">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-shop-violet hover:underline transition-colors font-medium">
                  Create one
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
