'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  CheckCircle,
  Lightbulb,
  Laugh,
  Target,
  Sliders,
  Sparkles,
  Briefcase,
  BookOpen,
  FileEdit,
  PartyPopper,
  Clock,
  Users,
  Cake,
  ArrowRight,
} from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-display md:text-h1-mobile font-heading text-dark mb-6">
              We've All Been There... 🤷
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Generate the perfect excuse for any situation. From believable to absolutely ridiculous.
            </p>
            <Link href="/generate">
              <Button size="lg" className="animate-pulse-slow">
                Create My Excuse <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-6 text-sm text-gray-500">
              Join 10,000+ people who've crafted the perfect excuse
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Preview Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-h2 md:text-h2-mobile font-heading text-center text-dark mb-12">
            Your Excuse, Your Way
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="hover" className="text-center">
              <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-h3-mobile font-heading text-dark mb-3">Believable</h3>
              <p className="text-gray-600 mb-4">
                Totally plausible excuses that sound 100% real
              </p>
              <div className="bg-secondary-200 rounded-lg p-4 text-sm text-dark">
                <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-2">
                  90% Believable
                </span>
                <p className="italic">
                  "Traffic was completely backed up due to an accident..."
                </p>
              </div>
            </Card>

            <Card variant="hover" className="text-center">
              <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-h3-mobile font-heading text-dark mb-3">Creative</h3>
              <p className="text-gray-600 mb-4">
                Unusual but possible - the perfect balance
              </p>
              <div className="bg-secondary-200 rounded-lg p-4 text-sm text-dark">
                <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-2">
                  70% Believable
                </span>
                <p className="italic">
                  "I helped my neighbor catch their escaped peacock..."
                </p>
              </div>
            </Card>

            <Card variant="hover" className="text-center">
              <Laugh className="h-12 w-12 text-warning mx-auto mb-4" />
              <h3 className="text-h3-mobile font-heading text-dark mb-3">Ridiculous</h3>
              <p className="text-gray-600 mb-4">
                Pure comedy gold for when you need a laugh
              </p>
              <div className="bg-secondary-200 rounded-lg p-4 text-sm text-dark">
                <span className="inline-block bg-warning/20 text-warning px-3 py-1 rounded-full text-xs font-semibold mb-2">
                  10% Believable
                </span>
                <p className="italic">
                  "I was abducted by a time-traveling DeLorean..."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-secondary-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-h2 md:text-h2-mobile font-heading text-center text-dark mb-12">
            Three Steps to Freedom
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-h3-mobile font-heading text-dark mb-3">Pick Your Situation</h3>
              <p className="text-gray-600">
                Work, school, social - we've got scenarios covered
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <Sliders className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-h3-mobile font-heading text-dark mb-3">Set Your Style</h3>
              <p className="text-gray-600">
                From believable to absolutely absurd
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-h3-mobile font-heading text-dark mb-3">Get Your Excuse</h3>
              <p className="text-gray-600">
                AI-crafted, human-sounding, ready to use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scenario Showcase Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-h2 md:text-h2-mobile font-heading text-center text-dark mb-12">
            Every Situation Covered
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ScenarioCard
              icon={<Briefcase className="h-12 w-12" />}
              title="Late to Work"
              subtitle="Traffic, alarms, and mysteries"
            />
            <ScenarioCard
              icon={<BookOpen className="h-12 w-12" />}
              title="Missed Class"
              subtitle="Lecture? What lecture?"
            />
            <ScenarioCard
              icon={<FileEdit className="h-12 w-12" />}
              title="Forgot Assignment"
              subtitle="Homework slip-ups solved"
            />
            <ScenarioCard
              icon={<PartyPopper className="h-12 w-12" />}
              title="Social Event Bail"
              subtitle="Party escape routes"
            />
            <ScenarioCard
              icon={<Clock className="h-12 w-12" />}
              title="Missed Deadline"
              subtitle="Project delays explained"
            />
            <ScenarioCard
              icon={<Users className="h-12 w-12" />}
              title="Family Skip"
              subtitle="Can't make dinner tonight"
            />
            <ScenarioCard
              icon={<Cake className="h-12 w-12" />}
              title="Forgot Special Date"
              subtitle="Anniversaries & birthdays"
            />
            <ScenarioCard
              icon={<Sparkles className="h-12 w-12" />}
              title="General Purpose"
              subtitle="Any situation, covered"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h2 md:text-h2-mobile font-heading mb-4">
            Ready to Craft Your Excuse?
          </h2>
          <p className="text-xl mb-8">
            No sign-up. No credit card. Just pure excuse genius.
          </p>
          <Link href="/generate">
            <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-gray-100">
              Let's Go <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-heading font-bold mb-2">Excuse Generator Pro</h3>
              <p className="text-gray-400 text-sm">
                Because honesty isn't always the best policy
              </p>
            </div>
            <div className="text-center">
              <div className="space-x-6 text-sm">
                <Link href="/generate" className="text-gray-400 hover:text-white">
                  Generate
                </Link>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400">About</span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400">Privacy</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">
                Made with ☕ and questionable ethics
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Excuse Generator Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}

function ScenarioCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <Card variant="hover" className="text-center">
      <div className="text-primary mb-3">{icon}</div>
      <h4 className="font-heading font-semibold text-dark mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </Card>
  )
}
