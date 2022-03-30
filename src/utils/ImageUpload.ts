export const checkImage = (file: File) => {
    const types = ['image/png', 'image/jpeg']
    if (!file) {
        return "File does not exist."
    }

    if (file.size > 1024 * 1024) {
        return "The largest image size is 1MB"
    }

    if (!types.includes(file.type)) {
        return "The image type is png / jpeg"
    }

    return ''
}

export const imageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "buowof6p")
    formData.append("cloud_name", "hieudv")

    const res = await fetch("https://api.cloudinary.com/v1_1/hieudv/upload", {
        method: "POST",
        body: formData
    })

    const data = await res.json()
    console.log(data)

    return {
        publicId: data.public_id,
        url: data.secure_url
    }
}