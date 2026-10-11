import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    ImageSourcePropType,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StatusBar,
    StyleSheet,
    View,
    useWindowDimensions,
} from 'react-native';
import slides from '../../Asset';

type Props = {
    images?: ImageSourcePropType[];
    interval?: number;
    showDots?: boolean;
    children?: React.ReactNode;
};

export default function LoginScreenCarousel({
    images = slides,
    interval = 6000,
    showDots = false,
    children,
}: Props) {
    const { width, height } = useWindowDimensions();
    const listRef = useRef<FlatList<ImageSourcePropType>>(null);
    const indexRef = useRef(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [activeDot, setActiveDot] = useState(0);

    const canLoop = images.length > 1;
    // Copy of the first image at the end makes the loop seamless
    const data = canLoop ? [...images, images[0]] : images;

    const goTo = useCallback(
        (i: number, animated: boolean) => {
            listRef.current?.scrollToOffset({ offset: i * width, animated });
            indexRef.current = i;
            setActiveDot(i % images.length);
        },
        [width, images.length],
    );

    const next = useCallback(() => {
        if (indexRef.current >= images.length) {
            // On the copy of slide 1: jump back to the real slide 1 invisibly, then move on
            goTo(0, false);
            requestAnimationFrame(() => goTo(1, true));
        } else {
            goTo(indexRef.current + 1, true);
        }
    }, [goTo, images.length]);

    const stop = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
    }, []);

    const start = useCallback(() => {
        stop();
        if (canLoop) timerRef.current = setInterval(next, interval);
    }, [stop, next, interval, canLoop]);

    useEffect(() => {
        start();
        return stop;
    }, [start, stop]);

    useEffect(() => {
        goTo(indexRef.current, false);
    }, [width, goTo]);

    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const i = Math.round(e.nativeEvent.contentOffset.x / width);
        if (i >= images.length) {
            goTo(0, false);
        } else {
            indexRef.current = i;
            setActiveDot(i);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <FlatList
                ref={listRef}
                data={data}
                keyExtractor={(_, i) => String(i)}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
                onScrollBeginDrag={stop}
                onScrollEndDrag={start}
                onMomentumScrollEnd={onMomentumScrollEnd}
                initialNumToRender={2}
                windowSize={3}
                renderItem={({ item }) => (
                    <Image source={item} style={{ width, height }} resizeMode="cover" />
                )}
            />

            <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
                {children}
            </View>

            {showDots && canLoop && (
                <View style={styles.dots} pointerEvents="none">
                    {images.map((_, i) => (
                        <View key={i} style={[styles.dot, i === activeDot && styles.dotActive]} />
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    dots: {
        position: 'absolute',
        bottom: 48,
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.45)',
    },
    dotActive: { width: 22, backgroundColor: '#a43333' },
});