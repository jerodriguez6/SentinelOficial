import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './Badge';
import { Button } from './ui/button';
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, MoreHorizontal, UserPlus } from 'lucide-react';

const FeedPost = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        // Aquí iría la lógica para seguir/dejar de seguir al usuario
    };

    return (
        <Card className="bg-zinc-800 border-zinc-700 hover:border-zinc-600 transition-all duration-300 group">
            <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                                {post.author.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <span className="text-white font-medium">{post.author}</span>
                                {post.verified && (
                                    <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                )}
                                <span className="text-slate-400 text-sm">@{post.handle}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-400">
                                <span>{post.timestamp}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs border-zinc-600 text-slate-400">
                                    {post.type}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Follow Button */}
                    <div className="flex items-center space-x-2">
                        <Button
                            size="sm"
                            onClick={handleFollow}
                            className={`text-white text-xs px-4 py-1 transition-colors ${isFollowing
                                ? 'bg-zinc-600 hover:bg-zinc-700'
                                : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            <UserPlus className="w-3 h-3 mr-1" />
                            {isFollowing ? 'Following' : 'Follow'}
                        </Button>

                        <button className="p-2 hover:bg-zinc-700 rounded-full transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <p className="text-white text-base leading-relaxed mb-3">
                        {post.content}
                    </p>

                    {/* Chart/Image */}
                    {post.image && (
                        <div className="relative overflow-hidden rounded-lg mb-3">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {post.chartData && (
                                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                        <span className="text-white text-sm font-medium">{post.chartData}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-zinc-600 text-slate-300 hover:border-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
                            >
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Metrics */}
                {post.metrics && (
                    <div className="bg-zinc-700/50 rounded-lg p-3 mb-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-slate-400">Price: </span>
                                <span className="text-white font-medium">{post.metrics.price}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">24h Change: </span>
                                <span className={`font-medium ${post.metrics.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                    {post.metrics.change}
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-400">Volume: </span>
                                <span className="text-white font-medium">{post.metrics.volume}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">Market Cap: </span>
                                <span className="text-white font-medium">{post.metrics.marketCap}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-zinc-700 pt-4">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={`flex items-center space-x-2 hover:text-red-400 transition-colors ${isLiked ? 'text-red-400' : 'text-slate-400'
                                }`}
                        >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            <span className="text-sm">{post.likes}</span>
                        </button>

                        <button className="flex items-center space-x-2 text-slate-400 hover:text-orange-400 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{post.comments}</span>
                        </button>

                        <button className="flex items-center space-x-2 text-slate-400 hover:text-green-400 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">{post.shares}</span>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-2 hover:bg-zinc-700 rounded-full transition-colors ${isBookmarked ? 'text-yellow-400' : 'text-slate-400'
                            }`}
                    >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

export default FeedPost;