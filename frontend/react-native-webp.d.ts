declare module 'react-native-webp' {
    export function convert(
      inputPath: string,
      outputPath: string,
      options: string
    ): Promise<string>;
  }