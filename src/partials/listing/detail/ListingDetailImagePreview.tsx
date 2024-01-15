import Carousel from '@turistikrota/ui/carousel'
import { useImagePreview } from '@turistikrota/ui/image/preview'

type Props = {
  images: string[]
  title: string
}

const ListingDetailImagePreview: React.FC<Props> = ({ images, title }) => {
  const preview = useImagePreview()

  const openPreview = (_: string, idx: number) => {
    preview.show(idx)
  }

  return (
    <Carousel
      imageAltPrefix={title}
      images={images}
      onClick={openPreview}
      autoPlay
      variant={Carousel.Variants.DetailHorizontal}
    />
  )
}

export default ListingDetailImagePreview
