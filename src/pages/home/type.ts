export interface Contract {
  data: {
    contracts: {
      attachment: {
        origName: string, 
        size :number,
        url: Blob,
      },
      course: {
        createdAt: string,
        id: number,
        name: string,
      }[],
      createdAt: string,
      id: number,
      title: string
    }[]
  }
}