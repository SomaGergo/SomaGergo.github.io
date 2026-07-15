export type Project = {
  slug: string
  title: string
  description: string
  details: string
  technologies: string[]
  metrics: Record<string, string>
  gradient: string
  contentFile?: string
}

export const projects: Project[] = [
  {
    slug: 'nlp-video-transcription-pipeline',
    title: 'NLP Video Transcription Pipeline',
    description:
      'Advanced NLP pipeline that transcribes video and detects emotions while translating to multiple languages.',
    details:
      'Built an end-to-end system for speech-to-text, multi-language translation, and sentence-level emotion scoring to improve accessibility and content analytics.',
    technologies: ['Python', 'Whisper', 'Transformers', 'FFmpeg', 'spaCy'],
    metrics: { languages: '20+', accuracy: '92%', emotions: '7' },
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    slug: 'nac-breda-signing-predictor',
    title: 'NAC Breda Signing Predictor',
    description:
      'Machine learning system predicting the best football player signings for NAC Breda using performance and market data.',
    details:
      'Developed models that analyze player statistics, team fit, and market value to recommend optimal recruits for the next season.',
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Matplotlib'],
    metrics: { features: '30+', models: '5', accuracy: '87%' },
    gradient: 'from-purple-500/20 to-pink-500/20',
    contentFile: 'readme_nac.md',
  },
  {
    slug: 'retail-demographics-classifier',
    title: 'Retail Demographics Classifier',
    description:
      'Keras-based image classifier that profiles retail customer demographics to support store analytics.',
    details:
      'Trained deep learning models on customer image data to infer age groups and demographics, helping retail teams understand shopper patterns.',
    technologies: ['Python', 'Keras', 'TensorFlow', 'OpenCV', 'Pandas'],
    metrics: { dataset: '10k+', accuracy: '89%', classes: '4' },
    gradient: 'from-emerald-500/20 to-lime-500/20',
  },
  {
    slug: 'neuroscan-ai',
    title: 'NeuroScan AI',
    description:
      '3D brain tumor segmentation prototype that uses multi-modal MRI and a custom 3D U-Net to generate tumor sub-region masks.',
    details:
      'Built as a BSc graduation project, this system combines a FastAPI web interface, sliding-window inference, and uncertainty-aware outputs for educational and research use.',
    technologies: ['Python', 'PyTorch', 'MONAI', 'FastAPI', 'Docker', '3D U-Net'],
    metrics: { dataset: '484 cases', dice: '0.851', regions: '3' },
    gradient: 'from-cyan-500/20 to-blue-500/20',
    contentFile: 'readme_neuroscanai.md',
  },
  {
    slug: 'reporting-dashboard',
    title: 'Reporting Dashboard',
    description:
      'Live dashboard and automated reporting system for campaign analytics.',
    details:
      'Designed dashboards and automation tools to reduce manual reporting effort and surface real-time campaign insights across social and programmatic advertising.',
    technologies: ['Python', 'Dash', 'Plotly', 'SQL', 'API'],
    metrics: { clients: '10+', reports: 'Realtime', automation: '80%' },
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    slug: 'anwb-accident-risk-model',
    title: 'ANWB Accident Risk Model',
    description:
      'Predictive machine learning model estimating road accident likelihood using environmental and traffic data.',
    details:
      'Built accident probability models for ANWB using historical, weather, and roadway data to create actionable risk insights.',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'GeoPandas', 'Folium'],
    metrics: { factors: '25+', accuracy: '84%', coverage: 'NL' },
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    slug: 'reground',
    title: 'ReGround',
    description:
      'A screen-time blocker app that helps people step away from their phones and build healthier habits through real-world action.',
    details:
      'The product combines native iOS blocking, short offline missions, and a tree-growth reward loop to reduce compulsive scrolling in a more motivating way.',
    technologies: ['React Native', 'Expo', 'Swift', 'iOS', 'Firebase'],
    metrics: { platform: 'iOS', status: 'TestFlight', impact: 'Habits' },
    gradient: 'from-sky-500/20 to-indigo-500/20',
    contentFile: 'readme_regroundd.md',
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getPublishedProjects() {
  return projects.filter((project) => project.contentFile)
}
