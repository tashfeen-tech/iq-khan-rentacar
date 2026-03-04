"use client";

import { motion } from "framer-motion";
import { Youtube, Music2, ExternalLink, Play } from "lucide-react";
import styles from "./VideoGallery.module.css";

const VIDEOS = [
    {
        id: "v1",
        platform: "youtube",
        title: "Company Overview",
        thumbnail: "https://img.youtube.com/vi/FwW-u7Ju0Fk/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=FwW-u7Ju0Fk",
        icon: Youtube
    },
    {
        id: "v2",
        platform: "tiktok",
        title: "Showroom Showcase",
        thumbnail: "/logo.png",
        url: "https://www.tiktok.com/@popularrentacars/video/7347039125695991045",
        icon: Music2
    },
    {
        id: "v3",
        platform: "youtube",
        title: "One-Way Service Promo",
        thumbnail: "https://img.youtube.com/vi/-AUpnQ2g31E/maxresdefault.jpg",
        url: "https://www.youtube.com/shorts/-AUpnQ2g31E",
        icon: Youtube
    },
    {
        id: "v4",
        platform: "tiktok",
        title: "Popular Fleet Montage",
        thumbnail: "/logo.png",
        url: "https://www.tiktok.com/@muhammadimran.777/video/7489098510575389970",
        icon: Music2
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
                    Catch a glimpse of our premium showroom, diverse fleet, and exceptional services
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
                            <div className={video.platform === 'youtube' ? styles.platformBadgeYt : styles.platformBadgeTk}>
                                <video.icon size={16} />
                                <span>{video.platform === 'youtube' ? 'YouTube' : 'TikTok'}</span>
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
