"use client";

import { motion } from "framer-motion";
import { Youtube, Music2, ExternalLink, Play } from "lucide-react";
import styles from "./VideoGallery.module.css";

const VIDEOS = [
    {
        id: "v1",
        platform: "facebook",
        title: "IQ Khan Fleet Showcase",
        thumbnail: "/logo.png",
        url: "https://www.facebook.com/iqkhanrentacar",
        icon: ExternalLink
    },
    {
        id: "v2",
        platform: "facebook",
        title: "Our Premium Services",
        thumbnail: "/logo.png",
        url: "https://www.facebook.com/iqkhanrentacar/videos",
        icon: ExternalLink
    },
    {
        id: "v3",
        platform: "facebook",
        title: "Customer Testimonials",
        thumbnail: "/logo.png",
        url: "https://www.facebook.com/iqkhanrentacar",
        icon: ExternalLink
    },
    {
        id: "v4",
        platform: "facebook",
        title: "All Pakistan Service",
        thumbnail: "/logo.png",
        url: "https://www.facebook.com/iqkhanrentacar",
        icon: ExternalLink
    }
];

const VideoGallery = () => {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.title}
                >
                    Showcasing <span className="gradient-text">Our Excellence</span>
                </motion.h2>
                <p className={styles.subtitle}>
                    Catch a glimpse of our premium fleet, diverse vehicles, and exceptional services
                    through our latest social media highlights.
                </p>
            </div>

            <div className={styles.grid}>
                {VIDEOS.map((video, i) => (
                    <motion.a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={video.id}
                        className={styles.videoCard}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                    >
                        <div className={styles.thumbnailWrapper}>
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className={video.thumbnail.includes('logo') ? styles.thumbnailLogo : styles.thumbnail}
                            />
                            <div className={styles.overlay}>
                                <div className={styles.playButton}>
                                    <Play size={24} fill="currentColor" />
                                </div>
                            </div>
                            <div className={styles.platformBadgeTk}>
                                <video.icon size={16} />
                                <span>Facebook</span>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <h3>{video.title}</h3>
                            <ExternalLink size={16} className={styles.linkIcon} />
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
};

export default VideoGallery;
