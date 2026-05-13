import type { DatasetStats, ModelDefinition, WeatherClass } from '../types/domain';

export const WEATHER_CLASSES: WeatherClass[] = [
  { id: 'cloudy', label: 'Cloudy', index: 1, description: 'Cloud-covered sky conditions.' },
  { id: 'foggy', label: 'Foggy', index: 4, description: 'Reduced visibility caused by fog or mist.' },
  { id: 'rainy', label: 'Rainy', index: 2, description: 'Rainfall or wet weather conditions.' },
  { id: 'shine', label: 'Shine', index: 3, description: 'Bright clear daylight or sunny weather.' },
  { id: 'sunrise', label: 'Sunrise', index: 5, description: 'Sunrise scenes with warm horizon light.' }
];

const inputSize = { width: 256, height: 256, channels: 3 };

export const MODEL_DEFINITIONS: ModelDefinition[] = [
  {
    id: 'cnn-without-augmentation',
    name: 'CNN without Augmentation',
    architecture: 'Custom CNN',
    description: 'Sequential CNN using Conv2D, MaxPooling2D, Dense layers, and softmax output.',
    inputSize,
    batchSize: 16,
    epochs: 30,
    optimizer: 'Adam',
    loss: 'categorical_crossentropy',
    outputActivation: 'softmax',
    classCount: 5,
    preprocessing: 'ImageDataGenerator(rescale=1/255.0)',
    augmentationEnabled: false,
    documentedAccuracy: 0.5667
  },
  {
    id: 'cnn-with-augmentation',
    name: 'CNN with Augmentation',
    architecture: 'Custom CNN',
    description: 'Sequential CNN with augmentation applied to increase training diversity.',
    inputSize,
    batchSize: 16,
    epochs: 30,
    optimizer: 'Adam',
    loss: 'categorical_crossentropy',
    outputActivation: 'softmax',
    classCount: 5,
    preprocessing: 'ImageDataGenerator(rescale=1/255.0 + augmentation)',
    augmentationEnabled: true,
    documentedAccuracy: 0.633
  },
  {
    id: 'resnet50',
    name: 'ResNet50 + CNN Layers',
    architecture: 'ResNet50',
    description: 'Transfer learning model with CNN classifier head and augmentation.',
    inputSize,
    batchSize: 8,
    epochs: 30,
    optimizer: 'Adam',
    loss: 'categorical_crossentropy',
    outputActivation: 'softmax',
    classCount: 5,
    preprocessing: 'tensorflow.keras.applications.resnet.preprocess_input',
    augmentationEnabled: true,
    documentedAccuracy: 0.589
  },
  {
    id: 'vgg16',
    name: 'VGG16',
    architecture: 'VGG16',
    description: 'VGG16 with data augmentation, dense layers, dropout, and batch normalization.',
    inputSize,
    batchSize: 8,
    epochs: 30,
    optimizer: 'Adam',
    loss: 'categorical_crossentropy',
    outputActivation: 'softmax',
    classCount: 5,
    preprocessing: 'VGG preprocess_input',
    augmentationEnabled: true,
    documentedAccuracy: 0.93
  },
  {
    id: 'vgg19',
    name: 'VGG19',
    architecture: 'VGG19',
    description: 'VGG19 with data augmentation, dense layers, dropout, and batch normalization.',
    inputSize,
    batchSize: 8,
    epochs: 30,
    optimizer: 'Adam',
    loss: 'categorical_crossentropy',
    outputActivation: 'softmax',
    classCount: 5,
    preprocessing: 'VGG preprocess_input',
    augmentationEnabled: true,
    documentedAccuracy: 0.84
  },
  {
    id: 'inceptionv3',
    name: 'InceptionV3',
    architecture: 'InceptionV3',
    description: 'InceptionV3 transfer learning model with dense softmax classifier.',
    inputSize,
    batchSize: 8,
    epochs: 30,
    optimizer: 'Adam',
    loss: 'categorical_crossentropy',
    outputActivation: 'softmax',
    classCount: 5,
    preprocessing: 'tensorflow.keras.applications.inception_v3.preprocess_input',
    augmentationEnabled: true,
    documentedAccuracy: 0.3
  },
  {
    id: 'efficientnet-b0',
    name: 'EfficientNetB0',
    architecture: 'EfficientNetB0',
    description: 'EfficientNetB0 transfer learning model with augmentation and dense classifier.',
    inputSize,
    batchSize: 8,
    epochs: 30,
    optimizer: 'Adam',
    loss: 'categorical_crossentropy',
    outputActivation: 'softmax',
    classCount: 5,
    preprocessing: 'tensorflow.keras.applications.efficientnet.preprocess_input',
    augmentationEnabled: true,
    documentedAccuracy: 0.8
  },
  {
    id: 'resnet152',
    name: 'ResNet152',
    architecture: 'ResNet152',
    description: 'ResNet152 transfer learning model with augmentation and dense classifier.',
    inputSize,
    batchSize: 8,
    epochs: 30,
    optimizer: 'Adam',
    loss: 'categorical_crossentropy',
    outputActivation: 'softmax',
    classCount: 5,
    preprocessing: 'tensorflow.keras.applications.resnet.preprocess_input',
    augmentationEnabled: true,
    documentedAccuracy: 0.87
  },
  {
    id: 'resnet101',
    name: 'ResNet101',
    architecture: 'ResNet101',
    description: 'Selected best documented model with augmentation, dense layers, dropout, and batch normalization.',
    inputSize,
    batchSize: 8,
    epochs: 30,
    optimizer: 'Adam',
    loss: 'categorical_crossentropy',
    outputActivation: 'softmax',
    classCount: 5,
    preprocessing: 'tensorflow.keras.applications.resnet.preprocess_input',
    augmentationEnabled: true,
    documentedAccuracy: 0.97,
    selected: true
  },
  {
    id: 'xception',
    name: 'Xception',
    architecture: 'Xception',
    description: 'Xception transfer learning model with augmentation and dense softmax output.',
    inputSize,
    batchSize: 8,
    epochs: 30,
    optimizer: 'Adam',
    loss: 'categorical_crossentropy',
    outputActivation: 'softmax',
    classCount: 5,
    preprocessing: 'tensorflow.keras.applications.xception.preprocess_input',
    augmentationEnabled: true
  }
];

export const DATASET_STATS: DatasetStats = {
  classes: WEATHER_CLASSES,
  splits: [
    { name: 'training', imageCount: 1274, splitRatio: 0.85, notes: 'Training images after preprocessing split.' },
    { name: 'validation', imageCount: 226, splitRatio: 0.15, notes: 'Validation images after preprocessing split.' },
    { name: 'test', imageCount: 30, notes: 'Test images processed from dataset/test.csv and dataset/alien_test/.' }
  ],
  preprocessingRules: [
    'Resize every image to 256 x 256 x 3.',
    'Ignore zero-length files during dataset splitting.',
    'Use categorical labels for five classes.',
    'Use 85% training and 15% validation split.',
    'Use 1/255 rescaling for custom CNN models.',
    'Use Keras model-specific preprocess_input for transfer learning architectures.'
  ]
};
