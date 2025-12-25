import { Building2, Users, Award, TrendingUp } from 'lucide-react'

export function Stats() {
  const stats = [
    {
      icon: Building2,
      value: '500+',
      label: 'Premium Properties',
      description: 'Curated luxury listings',
    },
    {
      icon: Users,
      value: '200+',
      label: 'Happy Clients',
      description: 'Satisfied homeowners',
    },
    {
      icon: Award,
      value: '15+',
      label: 'Years Experience',
      description: 'Industry expertise',
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Success Rate',
      description: 'Closing deals',
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-primary-100 rounded-lg p-3">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
